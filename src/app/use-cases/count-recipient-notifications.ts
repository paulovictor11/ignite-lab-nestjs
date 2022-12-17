import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";

interface iCountRecipientNotificationsRequest {
    recipientId: string;
}

interface iCountRecipientNotificationsResponse {
    count: number;
}

@Injectable()
export class CountRecipientNotifications {
    constructor(private notificationRepository: NotificationRepository) {}

    async execute(
        request: iCountRecipientNotificationsRequest
    ): Promise<iCountRecipientNotificationsResponse> {
        const { recipientId } = request;
        const count = await this.notificationRepository.countManyByRecipientId(
            recipientId
        );

        return { count };
    }
}
