/**
 * Created by chenhao on 16/6/4.
 */

/////////////////
// Share
/////////////////

export const SHARE_PRIVATE = 0;
export const SHARE_TOKEN = 1;
export const SHARE_PUBLIC = 2;

export const SHARES = [
    { label: "Private", value: SHARE_PRIVATE },
    { label: "Token", value: SHARE_TOKEN },
    { label: "Public", value: SHARE_PUBLIC }
];

export const SHARES_TYPES = _.map(SHARES, function (share) {
    return share.value
});

export const SHARES_AUTO_FORM = SHARES;

/////////////////
// Status
/////////////////

export const STATUS_NEW = 0;
export const STATUS_SUBMITTED = 1;
export const STATUS_REJECTED = 2;
export const STATUS_NORMAL = 3;
export const STATUS_READONLY = 4;
export const STATUS_DISABLED = 5;
export const STATUS_DELETED = 6;

export const STATUS = [
    { label: "New", value: STATUS_NEW },
    { label: "Submitted", value: STATUS_SUBMITTED },
    { label: "Rejected", value: STATUS_REJECTED },
    { label: "Normal", value: STATUS_NORMAL },
    { label: "Read Only", value: STATUS_READONLY },
    { label: "Disabled", value: STATUS_DISABLED },
    { label: "Deleted", value: STATUS_DELETED }
];

export const STATUS_TYPES = _.map(STATUS, function (status) {
    return status.value
});

export const STATUS_AUTO_FORM = STATUS;

/////////////////
// Messages Type
/////////////////

export const MSG_DATA = 0;
export const MSG_EVENT = 1;
export const MSG_CONTROL = 2;

export const MSGS = [
    { label: "Data", value: MSG_DATA },
    { label: "Event", value: MSG_EVENT },
    { label: "Control", value: MSG_CONTROL }
];

export const MSGS_TYPES = _.map(MSGS, function (msg) {
    return msg.value
});

export const MSGS_AUTO_FORM = MSGS;
