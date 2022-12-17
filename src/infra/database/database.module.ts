import { Module } from "@nestjs/common";
import { NotificationRepository } from "@app/repositories/notification-repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaNotificationRepository } from "./prisma/repositories/prisma-notification-repository";

@Module({
    imports: [],
    controllers: [],
    providers: [
        PrismaService,
        {
            provide: NotificationRepository,
            useClass: PrismaNotificationRepository,
        },
    ],
    exports: [NotificationRepository],
})
export class DatabaseModule {}
