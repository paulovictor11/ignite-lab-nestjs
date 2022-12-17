import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationRepository } from "../repositories/notification-repository";

interface iSendNotificationRequest {
    recipientId: string;
    content: string;
    category: string;
}

interface iSendNotificationResponse {
    notification: Notification;
}

@Injectable()
export class SendNotification {
    constructor(private notificationRepository: NotificationRepository) {}

    async execute(
        request: iSendNotificationRequest
    ): Promise<iSendNotificationResponse> {
        const { recipientId, content, category } = request;

        const notification = new Notification({
            recipientId,
            category,
            content: new Content(content),
        });

        await this.notificationRepository.create(notification);

        return {
            notification,
        };
    }
}
