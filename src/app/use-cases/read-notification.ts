import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface iReadNotificationRequest {
    notificationId: string;
}

type iReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
    constructor(private notificationRepository: NotificationRepository) {}

    async execute(
        request: iReadNotificationRequest
    ): Promise<iReadNotificationResponse> {
        const { notificationId } = request;
        const notification = await this.notificationRepository.findById(
            notificationId
        );

        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.read();

        await this.notificationRepository.save(notification);
    }
}
