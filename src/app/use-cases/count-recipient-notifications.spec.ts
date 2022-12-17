import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";

describe("Count recipient notifications", () => {
    it("should be able to count recipient notifications", async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const countRecipientNotifications = new CountRecipientNotifications(
            notificationRepository
        );

        const notification = makeNotification();
        const anotherNotification = makeNotification({
            recipientId: "example-another-recipient-id",
        });

        await notificationRepository.create(notification);
        await notificationRepository.create(notification);
        await notificationRepository.create(anotherNotification);

        const { count } = await countRecipientNotifications.execute({
            recipientId: "example-recipient-id",
        });

        expect(count).toEqual(2);
    });
});
