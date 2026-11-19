# Optional Remote MCP — Not Deployed

**Status: design only.** The current request authorizes fixing the private GitHub Design System without connecting Figma. It does not authorize publishing a network service or exposing private data.

To offer MCP remotely later, obtain explicit approval for hosting, users and authentication. Require HTTPS, OAuth 2.1/OIDC per MCP 2026 security guidance, bearer-token validation, issuer/resource audience checking, short-lived read-only scoped tokens, explicit access control to the private repository, origin protection, rate and output-size limits, revocation, monitoring, audit logs without sensitive content, and key rotation. Keep write tools disabled.

Use a supported official SDK v2 HTTP adapter and `createMcpHandler` after threat modelling, independent security review, deploy QA and cost review. Local stdio remains the default. Never turn the private GitHub Repo public merely to simplify AI access.
