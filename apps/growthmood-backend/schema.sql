-- GrowthMood SaaS: preliminary tenant-aware PostgreSQL/Supabase schema.
-- NOT APPLIED. Review in a DEDICATED GrowthMood database, with security tests.
-- Private center records are never to be exposed to unauthenticated clients.
BEGIN;

CREATE TABLE IF NOT EXISTS public.gm_centers (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9-]{3,64}$'),
 name text NOT NULL CHECK (length(trim(name)) BETWEEN 2 AND 160),
 city text,
 owner_id uuid NOT NULL REFERENCES auth.users(id),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.gm_memberships (
 center_id uuid NOT NULL REFERENCES public.gm_centers(id) ON DELETE CASCADE,
 user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 role text NOT NULL CHECK (role IN ('owner','admin','staff','trainer','trainee')),
 active boolean NOT NULL DEFAULT true,
 joined_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(center_id,user_id)
);

CREATE TABLE IF NOT EXISTS public.gm_branches (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 center_id uuid NOT NULL REFERENCES public.gm_centers(id) ON DELETE CASCADE,
 name text NOT NULL CHECK (length(trim(name)) BETWEEN 2 AND 160),
 city text,
 address text,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(center_id,id)
);

CREATE TABLE IF NOT EXISTS public.gm_trainers (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 center_id uuid NOT NULL REFERENCES public.gm_centers(id) ON DELETE CASCADE,
 user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
 name text NOT NULL,
 specialty text,
 email text,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(center_id,id)
);

CREATE TABLE IF NOT EXISTS public.gm_trainees (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 center_id uuid NOT NULL REFERENCES public.gm_centers(id) ON DELETE CASCADE,
 user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
 name text NOT NULL,
 email text,
 phone text,
 joined_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(center_id,id)
);

CREATE TABLE IF NOT EXISTS public.gm_courses (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 center_id uuid NOT NULL REFERENCES public.gm_centers(id) ON DELETE CASCADE,
 title text NOT NULL CHECK (length(trim(title)) BETWEEN 3 AND 200),
 category text,
 trainer_id uuid,
 branch_id uuid,
 capacity integer NOT NULL DEFAULT 20 CHECK (capacity>0),
 price_minor bigint NOT NULL DEFAULT 0 CHECK (price_minor>=0),
 currency char(3) NOT NULL DEFAULT 'USD',
 status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','active','completed','archived')),
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(center_id,id),
 FOREIGN KEY(center_id,trainer_id) REFERENCES public.gm_trainers(center_id,id),
 FOREIGN KEY(center_id,branch_id) REFERENCES public.gm_branches(center_id,id)
);

CREATE TABLE IF NOT EXISTS public.gm_sessions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 center_id uuid NOT NULL REFERENCES public.gm_centers(id) ON DELETE CASCADE,
 course_id uuid NOT NULL,
 branch_id uuid,
 session_date date NOT NULL,
 start_time time NOT NULL,
 duration_minutes integer NOT NULL CHECK (duration_minutes BETWEEN 15 AND 600),
 room text,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(center_id,id),
 FOREIGN KEY(center_id,course_id) REFERENCES public.gm_courses(center_id,id),
 FOREIGN KEY(center_id,branch_id) REFERENCES public.gm_branches(center_id,id)
);

CREATE TABLE IF NOT EXISTS public.gm_enrollments (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 center_id uuid NOT NULL REFERENCES public.gm_centers(id) ON DELETE CASCADE,
 trainee_id uuid NOT NULL,
 course_id uuid NOT NULL,
 status text NOT NULL DEFAULT 'enrolled' CHECK (status IN ('enrolled','withdrawn','completed')),
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(center_id,id),
 UNIQUE(center_id,trainee_id,course_id),
 FOREIGN KEY(center_id,trainee_id) REFERENCES public.gm_trainees(center_id,id),
 FOREIGN KEY(center_id,course_id) REFERENCES public.gm_courses(center_id,id)
);

CREATE TABLE IF NOT EXISTS public.gm_attendance (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 center_id uuid NOT NULL REFERENCES public.gm_centers(id) ON DELETE CASCADE,
 session_id uuid NOT NULL,
 enrollment_id uuid NOT NULL,
 status text NOT NULL CHECK (status IN ('present','absent','excused')),
 recorded_by uuid REFERENCES auth.users(id),
 recorded_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(center_id,session_id,enrollment_id),
 FOREIGN KEY(center_id,session_id) REFERENCES public.gm_sessions(center_id,id),
 FOREIGN KEY(center_id,enrollment_id) REFERENCES public.gm_enrollments(center_id,id)
);

CREATE TABLE IF NOT EXISTS public.gm_certificates (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 center_id uuid NOT NULL REFERENCES public.gm_centers(id) ON DELETE CASCADE,
 enrollment_id uuid NOT NULL,
 code text NOT NULL UNIQUE DEFAULT ('GM-'||upper(substr(replace(gen_random_uuid()::text,'-',''),1,12))),
 status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','issued','revoked')),
 issued_by uuid REFERENCES auth.users(id),
 issued_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(center_id,enrollment_id),
 FOREIGN KEY(center_id,enrollment_id) REFERENCES public.gm_enrollments(center_id,id)
);

CREATE TABLE IF NOT EXISTS public.gm_subscriptions (
 center_id uuid PRIMARY KEY REFERENCES public.gm_centers(id) ON DELETE CASCADE,
 plan text NOT NULL DEFAULT 'solo' CHECK (plan IN ('solo','starter','growth','enterprise')),
 status text NOT NULL DEFAULT 'trial' CHECK (status IN ('trial','active','past_due','suspended','expired','cancelled')),
 max_branches integer NOT NULL DEFAULT 1 CHECK (max_branches>0),
 max_trainers integer NOT NULL DEFAULT 1 CHECK (max_trainers>0),
 trial_expires_at timestamptz,
 current_period_end timestamptz,
 updated_at timestamptz NOT NULL DEFAULT now()
);

-- Helpers only check AUTHENTICATED identity against durable membership rows.
-- SECURITY DEFINER bypasses membership RLS to prevent recursive policy lookups.
-- Every function uses an empty search_path and fully qualified relations.
CREATE OR REPLACE FUNCTION public.gm_is_member(p_center uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=''
AS $f$
 SELECT (select auth.uid()) IS NOT NULL
 AND EXISTS (SELECT 1 FROM public.gm_memberships m
             WHERE m.center_id=p_center AND m.user_id=(select auth.uid()) AND m.active);
$f$;

CREATE OR REPLACE FUNCTION public.gm_has_role(p_center uuid,p_roles text[])
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=''
AS $f$
 SELECT (select auth.uid()) IS NOT NULL
 AND EXISTS (SELECT 1 FROM public.gm_memberships m
             WHERE m.center_id=p_center AND m.user_id=(select auth.uid())
               AND m.active AND m.role=ANY(p_roles));
$f$;

CREATE OR REPLACE FUNCTION public.gm_is_own_trainee(p_center uuid,p_trainee uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=''
AS $f$
 SELECT (select auth.uid()) IS NOT NULL AND EXISTS (
   SELECT 1 FROM public.gm_trainees t
   WHERE t.center_id=p_center AND t.id=p_trainee
     AND t.user_id=(select auth.uid())
 );
$f$;

CREATE OR REPLACE FUNCTION public.gm_is_own_enrollment(p_center uuid,p_enrollment uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=''
AS $f$
 SELECT (select auth.uid()) IS NOT NULL AND EXISTS (
   SELECT 1 FROM public.gm_enrollments e
   JOIN public.gm_trainees t ON t.center_id=e.center_id AND t.id=e.trainee_id
   WHERE e.center_id=p_center AND e.id=p_enrollment
     AND t.user_id=(select auth.uid())
 );
$f$;

CREATE OR REPLACE FUNCTION public.gm_bootstrap_center()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=''
AS $f$
BEGIN
 INSERT INTO public.gm_memberships(center_id,user_id,role)
 VALUES(NEW.id,NEW.owner_id,'owner');
 INSERT INTO public.gm_subscriptions(center_id,plan,status,trial_expires_at)
 VALUES(NEW.id,'solo','trial',now()+interval '14 days');
 RETURN NEW;
END;
$f$;

DROP TRIGGER IF EXISTS gm_center_bootstrap ON public.gm_centers;
CREATE TRIGGER gm_center_bootstrap AFTER INSERT ON public.gm_centers
 FOR EACH ROW EXECUTE FUNCTION public.gm_bootstrap_center();

CREATE OR REPLACE FUNCTION public.gm_validate_attendance()
RETURNS trigger LANGUAGE plpgsql SET search_path=''
AS $f$
DECLARE session_course uuid; enrollment_course uuid;
BEGIN
 SELECT course_id INTO session_course
 FROM public.gm_sessions WHERE center_id=NEW.center_id AND id=NEW.session_id;
 SELECT course_id INTO enrollment_course
 FROM public.gm_enrollments WHERE center_id=NEW.center_id AND id=NEW.enrollment_id;
 IF session_course IS NULL OR enrollment_course IS NULL OR session_course<>enrollment_course THEN
   RAISE EXCEPTION 'Attendance enrollment must belong to the session course';
 END IF;
 RETURN NEW;
END;
$f$;
DROP TRIGGER IF EXISTS gm_attendance_course_guard ON public.gm_attendance;
CREATE TRIGGER gm_attendance_course_guard BEFORE INSERT OR UPDATE ON public.gm_attendance
 FOR EACH ROW EXECUTE FUNCTION public.gm_validate_attendance();

ALTER TABLE public.gm_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gm_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gm_branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gm_trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gm_trainees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gm_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gm_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gm_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gm_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gm_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gm_subscriptions ENABLE ROW LEVEL SECURITY;

-- Centers: members can view, owner can edit, logged-in person can create theirs.
CREATE POLICY gm_center_read ON public.gm_centers FOR SELECT TO authenticated
 USING (public.gm_is_member(id) OR owner_id=(select auth.uid()));
CREATE POLICY gm_center_create ON public.gm_centers FOR INSERT TO authenticated
 WITH CHECK(owner_id=(select auth.uid()));
CREATE POLICY gm_center_owner_update ON public.gm_centers FOR UPDATE TO authenticated
 USING(owner_id=(select auth.uid())) WITH CHECK(owner_id=(select auth.uid()));

-- Membership management restricted to owner, avoiding role escalation by staff.
CREATE POLICY gm_members_read ON public.gm_memberships FOR SELECT TO authenticated
 USING(user_id=(select auth.uid()) OR public.gm_has_role(center_id,ARRAY['owner','admin']::text[]));
CREATE POLICY gm_members_add ON public.gm_memberships FOR INSERT TO authenticated
 WITH CHECK(public.gm_has_role(center_id,ARRAY['owner']::text[]));
CREATE POLICY gm_members_edit ON public.gm_memberships FOR UPDATE TO authenticated
 USING(public.gm_has_role(center_id,ARRAY['owner']::text[]))
 WITH CHECK(public.gm_has_role(center_id,ARRAY['owner']::text[]));
CREATE POLICY gm_members_remove ON public.gm_memberships FOR DELETE TO authenticated
 USING(public.gm_has_role(center_id,ARRAY['owner']::text[]) AND role<>'owner');

CREATE POLICY gm_branches_read ON public.gm_branches FOR SELECT TO authenticated
 USING(public.gm_is_member(center_id));
CREATE POLICY gm_branches_write ON public.gm_branches FOR ALL TO authenticated
 USING(public.gm_has_role(center_id,ARRAY['owner','admin','staff']::text[]))
 WITH CHECK(public.gm_has_role(center_id,ARRAY['owner','admin','staff']::text[]));

CREATE POLICY gm_trainers_read ON public.gm_trainers FOR SELECT TO authenticated
 USING(public.gm_is_member(center_id));
CREATE POLICY gm_trainers_write ON public.gm_trainers FOR ALL TO authenticated
 USING(public.gm_has_role(center_id,ARRAY['owner','admin','staff']::text[]))
 WITH CHECK(public.gm_has_role(center_id,ARRAY['owner','admin','staff']::text[]));

CREATE POLICY gm_trainees_read ON public.gm_trainees FOR SELECT TO authenticated
 USING(public.gm_has_role(center_id,ARRAY['owner','admin','staff','trainer']::text[])
   OR public.gm_is_own_trainee(center_id,id));
CREATE POLICY gm_trainees_write ON public.gm_trainees FOR ALL TO authenticated
 USING(public.gm_has_role(center_id,ARRAY['owner','admin','staff']::text[]))
 WITH CHECK(public.gm_has_role(center_id,ARRAY['owner','admin','staff']::text[]));

CREATE POLICY gm_courses_read ON public.gm_courses FOR SELECT TO authenticated
 USING(public.gm_is_member(center_id));
CREATE POLICY gm_courses_write ON public.gm_courses FOR ALL TO authenticated
 USING(public.gm_has_role(center_id,ARRAY['owner','admin','staff']::text[]))
 WITH CHECK(public.gm_has_role(center_id,ARRAY['owner','admin','staff']::text[]));

CREATE POLICY gm_sessions_read ON public.gm_sessions FOR SELECT TO authenticated
 USING(public.gm_is_member(center_id));
CREATE POLICY gm_sessions_write ON public.gm_sessions FOR ALL TO authenticated
 USING(public.gm_has_role(center_id,ARRAY['owner','admin','staff']::text[]))
 WITH CHECK(public.gm_has_role(center_id,ARRAY['owner','admin','staff']::text[]));

CREATE POLICY gm_enrollments_read ON public.gm_enrollments FOR SELECT TO authenticated
 USING(public.gm_has_role(center_id,ARRAY['owner','admin','staff','trainer']::text[])
   OR public.gm_is_own_enrollment(center_id,id));
CREATE POLICY gm_enrollments_write ON public.gm_enrollments FOR ALL TO authenticated
 USING(public.gm_has_role(center_id,ARRAY['owner','admin','staff']::text[]))
 WITH CHECK(public.gm_has_role(center_id,ARRAY['owner','admin','staff']::text[]));

CREATE POLICY gm_attendance_read ON public.gm_attendance FOR SELECT TO authenticated
 USING(public.gm_has_role(center_id,ARRAY['owner','admin','staff','trainer']::text[])
   OR public.gm_is_own_enrollment(center_id,enrollment_id));
CREATE POLICY gm_attendance_write ON public.gm_attendance FOR ALL TO authenticated
 USING(public.gm_has_role(center_id,ARRAY['owner','admin','staff','trainer']::text[]))
 WITH CHECK(public.gm_has_role(center_id,ARRAY['owner','admin','staff','trainer']::text[]));

CREATE POLICY gm_certificates_read ON public.gm_certificates FOR SELECT TO authenticated
 USING(public.gm_has_role(center_id,ARRAY['owner','admin','staff','trainer']::text[])
   OR public.gm_is_own_enrollment(center_id,enrollment_id));
CREATE POLICY gm_certificates_write ON public.gm_certificates FOR ALL TO authenticated
 USING(public.gm_has_role(center_id,ARRAY['owner','admin','staff']::text[]))
 WITH CHECK(public.gm_has_role(center_id,ARRAY['owner','admin','staff']::text[]));

-- Plan states cannot be manipulated by end users; a trusted billing service changes them.
CREATE POLICY gm_subscriptions_read ON public.gm_subscriptions FOR SELECT TO authenticated
 USING(public.gm_has_role(center_id,ARRAY['owner','admin']::text[]));

-- Explicit access grants: RLS still controls row-level access.
REVOKE ALL ON public.gm_centers, public.gm_memberships, public.gm_branches,
 public.gm_trainers, public.gm_trainees, public.gm_courses, public.gm_sessions,
 public.gm_enrollments, public.gm_attendance, public.gm_certificates, public.gm_subscriptions
 FROM PUBLIC, anon, authenticated;
GRANT SELECT,INSERT,UPDATE ON public.gm_centers TO authenticated;
GRANT SELECT,INSERT,UPDATE,DELETE ON public.gm_memberships, public.gm_branches,
 public.gm_trainers, public.gm_trainees, public.gm_courses, public.gm_sessions,
 public.gm_enrollments, public.gm_attendance, public.gm_certificates TO authenticated;
GRANT SELECT ON public.gm_subscriptions TO authenticated;

REVOKE ALL ON FUNCTION public.gm_is_member(uuid), public.gm_has_role(uuid,text[]),
 public.gm_is_own_trainee(uuid,uuid), public.gm_is_own_enrollment(uuid,uuid),
 public.gm_bootstrap_center(), public.gm_validate_attendance() FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.gm_is_member(uuid),public.gm_has_role(uuid,text[]),
 public.gm_is_own_trainee(uuid,uuid),public.gm_is_own_enrollment(uuid,uuid)
 TO authenticated;

CREATE INDEX IF NOT EXISTS gm_memberships_user_idx ON public.gm_memberships(user_id,center_id);
CREATE INDEX IF NOT EXISTS gm_courses_center_idx ON public.gm_courses(center_id,status);
CREATE INDEX IF NOT EXISTS gm_enrollments_course_idx ON public.gm_enrollments(center_id,course_id);
CREATE INDEX IF NOT EXISTS gm_sessions_date_idx ON public.gm_sessions(center_id,session_date);
CREATE INDEX IF NOT EXISTS gm_attendance_center_idx ON public.gm_attendance(center_id,session_id);

COMMIT;

-- IMPORTANT TODO BEFORE PRODUCTION:
-- 1. Test the migration on a disposable isolated Supabase project.
-- 2. Test two centers with multiple roles and explicit cross-center ID guesses.
-- 3. Lock down center membership creation/invites and owner transfer transactions.
-- 4. Enforce capacity atomically, subscription limits, time conflicts and billing state.
-- 5. Implement audit logging, rate limits, backups, GDPR/privacy compliance where applicable.
-- 6. Issue certificates only through trusted server-side eligibility checks.
-- 7. Verify security definer function ownership / PostgREST exposure / privileges.
