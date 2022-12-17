import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface iCancelNotificationRequest {
    notificationId: string;
}

type iCancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
    constructor(private notificationRepository: NotificationRepository) {}

    async execute(
        request: iCancelNotificationRequest
    ): Promise<iCancelNotificationResponse> {
        const { notificationId } = request;
        const notification = await this.notificationRepository.findById(
            notificationId
        );

        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.cancel();

        await this.notificationRepository.save(notification);
    }
}
