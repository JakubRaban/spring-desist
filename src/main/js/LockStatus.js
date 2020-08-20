export const CREATED = "CREATED";
export const CREATED_MSG = "Pending activation";
export const ACTIVE = "ACTIVE";
export const ACTIVE_MSG = "Active";
export const EXPIRED = "EXPIRED";
export const EXPIRED_MSG = "Expired"
export const OPENED = "OPENED";
export const OPENED_MSG = "Opened"

export const lockStatusToMessage = {
    CREATED: CREATED_MSG,
    ACTIVE: ACTIVE_MSG,
    EXPIRED: EXPIRED_MSG,
    OPENED: OPENED_MSG
}

export const getLockStatus = lock => {
    switch (lock.status) {
        case CREATED:
            return CREATED
        case ACTIVE:
            if (lock.expirationTime.getTime() < new Date().getTime())
                return EXPIRED
            else
                return ACTIVE
        case OPENED:
            return OPENED
    }
}
