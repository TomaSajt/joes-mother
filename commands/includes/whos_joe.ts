import { IncludesCommand } from "@tomasajt/cmd";

export default new IncludesCommand({
    names: ["who's joe", "who is joe", "whos joe", "who s joe"],
    action: ({ message }) => {
        message.channel.send("joe mama")
    }
})