import { Content } from "./content";
import { Notification } from "./notification";

describe("Notification", () => {
    it("should be able to create a notification", () => {
        const content = new Content("Você recebeu uma solicitação de amizade");
        const notification = new Notification({
            content,
            category: "social",
            recipientId: "example-recipient-id",
        });
        expect(notification).toBeTruthy();
    });
});
