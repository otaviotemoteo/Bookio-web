import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { UserProfile } from '../../../types/reader/profile';
import { User, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react';
import Image from 'next/image';

interface ProfileInfoProps {
  profile: UserProfile;
  onEdit?: () => void;
}

export function ProfileInfo({ profile, onEdit }: ProfileInfoProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-muted">
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
          </div>
          <Button variant="outline" size="sm">
            Alterar Foto
          </Button>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-muted-foreground">CPF: {profile.cpf}</p>
            </div>
            <Button size="sm" variant="outline" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{profile.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Telefone:</span>
                <span className="font-medium">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Nascimento:</span>
                <span className="font-medium">
                  {new Date(profile.birthDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-muted-foreground mb-1">Endereço:</p>
                  <p className="font-medium">
                    {profile.address.street}, {profile.address.number}
                    {profile.address.complement && `, ${profile.address.complement}`}
                  </p>
                  <p className="font-medium">
                    {profile.address.neighborhood} - {profile.address.city}/{profile.address.state}
                  </p>
                  <p className="font-medium">CEP: {profile.address.zipCode}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Membership Info */}
          <div className="mt-6 pt-6 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Membro desde</p>
              <p className="font-medium">
                {new Date(profile.memberSince).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}