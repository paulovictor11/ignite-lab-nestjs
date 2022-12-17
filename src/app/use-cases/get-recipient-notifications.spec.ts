import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";

describe("Get recipient notifications", () => {
    it("should be able to get recipient notifications", async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const getRecipientNotifications = new GetRecipientNotifications(
            notificationRepository
        );

        const notification = makeNotification();
        const anotherNotification = makeNotification({
            recipientId: "example-another-recipient-id",
        });

        await notificationRepository.create(notification);
        await notificationRepository.create(notification);
        await notificationRepository.create(anotherNotification);

        const { notifications } = await getRecipientNotifications.execute({
            recipientId: "example-recipient-id",
        });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    recipientId: "example-recipient-id",
                }),
                expect.objectContaining({
                    recipientId: "example-recipient-id",
                }),
            ])
        );
    });
});
