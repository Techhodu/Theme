import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface AuthInfoCardProps {
  user: {
    name: string;
    email: string;
    gender: string;
    dob: string;
    photo?: string;
    description: string;
    role: string;
    createdAt: string;
  };
}

export default function AuthInfoCard({ user }: AuthInfoCardProps) {
  return (
    <Card className="w-full col-span-2">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user?.photo} alt={user.name} />
          <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-2xl">{user?.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{user?.description}</p>
        <div className="grid gap-4">
          {/* <div className="flex items-center justify-between">
            <span className="font-semibold">Gender:</span>
            <Badge variant="secondary">{user?.gender}</Badge>
          </div> */}
          {/* <div className="flex items-center justify-between">
            <span className="font-semibold">Date of Birth</span>
            <span>{user.dob}</span>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
