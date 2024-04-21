import { Separator } from "@/src/components/ui/separator";
import { AddressForm } from "@/src/app/profile/address/address-form";
import { Badge } from "@/src/components/ui/badge";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Address</h3>
        <p className="text-sm text-muted-foreground">
          Update your account address{" "}
          <Badge variant={"secondary"}>Public Key</Badge> . Make sure it is
          correct.
        </p>
      </div>
      <Separator />
      <AddressForm />
    </div>
  );
}
