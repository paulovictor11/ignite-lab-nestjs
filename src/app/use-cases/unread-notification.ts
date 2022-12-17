import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface iUnreadNotificationRequest {
    notificationId: string;
}

type iUnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
    constructor(private notificationRepository: NotificationRepository) {}

    async execute(
        request: iUnreadNotificationRequest
    ): Promise<iUnreadNotificationResponse> {
        const { notificationId } = request;
        const notification = await this.notificationRepository.findById(
            notificationId
        );

        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.unread();

        await this.notificationRepository.save(notification);
    }
}
