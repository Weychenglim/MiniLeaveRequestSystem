# Project Requirements

## Purpose

Build a compact leave request feature for the NaiBnB technical assessment.

## Functional Requirements

- Show all leave requests from persistent storage.
- Allow staff to submit a leave request with `name`, `start_date`, `end_date`, and `reason`.
- Validate all fields on the server.
- Reject submissions where `end_date` is before `start_date`.
- Show clear validation messages when submission fails.
- Allow a manager-style user to approve or reject a request.
- Provide a status filter as the bonus feature.
- Show the number of leave days requested on each leave card.

## Deliverables

- Public-ready source code.
- README with local setup instructions.
- `ANSWERS.md` with the three scenario answers.
- One working screenshot in `screenshots/`.
- Multiple logical Git commits.

## Out Of Scope

- Authentication and real role management.
- Email notifications.
- Production deployment configuration.
