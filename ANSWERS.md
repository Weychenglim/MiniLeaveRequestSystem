# Scenario Answers

## S1. Overtime Claims Module

- Database tables: `overtime_claims`, maybe `overtime_claim_attachments`, and audit/status history if approvals need tracking.
- Backend endpoints/actions: create claim, list own claims, list manager queue, approve, reject, and view claim details.
- Frontend pages: staff submission form, staff claim history, manager approval queue, and claim detail page.
- Permissions: staff can create and view their own claims; managers can view and decide claims for their team; admins can audit all claims.
- Validation: required date, hours, reason/project, and attachment rules if receipts or proof are needed.

## S2. Approved Request Still Shows Pending

1. Check the approve request/response in browser dev tools to confirm the action is called and returns success.
2. Check backend logs to see whether the update query ran or failed silently.
3. Inspect the database row directly to confirm whether status changed from Pending to Approved.
4. Check the list refresh/query code for stale cache, wrong filtering, or reading from dummy data instead of the database.

## S3. Real API Key Committed Publicly

1. Treat the key as compromised immediately.
2. Tell the senior and responsible lead calmly with the repo link, commit, and exposed key name.
3. Revoke or rotate the API key in the provider dashboard.
4. Replace it with a new key stored in environment variables or the secret manager.
5. Remove `.env` from the repo, add it to `.gitignore`, and commit `.env.example` only.
6. Purge the secret from Git history if needed, then force-push only with team coordination.
7. Check logs/provider usage for abuse.
