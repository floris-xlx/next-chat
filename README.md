![image](https://github.com/user-attachments/assets/dc10563a-2d19-47b7-a575-98a78484a1d0)

## Athena-only setup

This project now relies solely on the Athena gateway for data access. Configure Athena credentials through environment variables (see `.env.local` for the required `ATHENA_BASE_URL`, `ATHENA_CLIENT`, `ATHENA_USER_ID`, and `ATHENA_API_KEY`) and do not set any Supabase-related keys—those values are deprecated and ignored.
