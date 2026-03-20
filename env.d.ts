declare global {
    interface CloudflareEnv {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        DB: any;
        ADMIN_KEY: string;
    }
}

export {};
