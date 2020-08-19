export const CREATED = "CREATED";
export const CREATED_MSG = "Pending activation";
export const ACTIVE = "ACTIVE";
export const ACTIVE_MSG = "Active";
export const EXPIRED = "EXPIRED";
export const EXPIRED_MSG = "Expired"
export const OPENED = "OPENED";
export const OPENED_MSG = "Opened"

export const getMessage = lock => {
    switch (lock.status) {
        case CREATED:
            return CREATED_MSG;
        case ACTIVE:
            return ACTIVE_MSG;
        case OPENED:
            return OPENED_MSG;
    }
}