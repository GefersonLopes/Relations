import * as express from "express"

declare global {
    namespace Express {
        interface Request {
            userADM: {
                id: string
                isAdm: boolean
            }
        }
    }
}