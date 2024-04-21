import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { EyeOff, RocketIcon } from "lucide-react";

export const AlertMsg = ({
    tab
}: {
    tab: string
}) => {
    return (
        <>
            <Alert variant={"default"}>
                <RocketIcon className="h-4 w-4" color="#ff4545" />
                <AlertTitle className="text-[#ff4545]">Heads up!</AlertTitle>
                <AlertDescription>Your {tab} is the only way to retreive your wallet!</AlertDescription>
            </Alert>
            <Alert variant={"default"}>
                <EyeOff className="h-4 w-4" color="#ff4545" />
                <AlertTitle className="text-[#ff4545]">Caution!</AlertTitle>
                <AlertDescription>Don't let anyone see your {tab}.</AlertDescription>
            </Alert>
        </>
    );
}