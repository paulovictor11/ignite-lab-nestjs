import { Content } from "@app/entities/content";
import { Notification, iNotification } from "@app/entities/notification";

type Override = Partial<iNotification>;

export function makeNotification(override: Override = {}) {
    return new Notification({
        category: "social",
        content: new Content("Nova soliticação de amizade!"),
        recipientId: "example-recipient-id",
        ...override,
    });
}
