import { Notification } from "@app/entities/notification";
import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";

interface iGetRecipientNotificationsRequest {
    recipientId: string;
}

interface iGetRecipientNotificationsResponse {
    notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
    constructor(private notificationRepository: NotificationRepository) {}

    async execute(
        request: iGetRecipientNotificationsRequest
    ): Promise<iGetRecipientNotificationsResponse> {
        const { recipientId } = request;
        const notifications =
            await this.notificationRepository.findManyByRecipientId(
                recipientId
            );

        return { notifications };
    }
}
