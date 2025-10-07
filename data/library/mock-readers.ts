export interface Reader {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
}

export const mockReaders: Reader[] = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@email.com",
    phone: "(11) 98765-4321",
    registrationDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    phone: "(11) 97654-3210",
    registrationDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Beatriz Santos",
    email: "beatriz.santos@email.com",
    phone: "(11) 96543-2109",
    registrationDate: "2024-03-10",
  },
  {
    id: "4",
    name: "Daniel Costa",
    email: "daniel.costa@email.com",
    phone: "(11) 95432-1098",
    registrationDate: "2024-04-05",
  },
  {
    id: "5",
    name: "Eduarda Lima",
    email: "eduarda.lima@email.com",
    phone: "(11) 94321-0987",
    registrationDate: "2024-05-12",
  },
  {
    id: "6",
    name: "Fernando Alves",
    email: "fernando.alves@email.com",
    phone: "(11) 93210-9876",
    registrationDate: "2024-06-18",
  },
  {
    id: "7",
    name: "Gabriela Martins",
    email: "gabriela.martins@email.com",
    phone: "(11) 92109-8765",
    registrationDate: "2024-07-22",
  },
  {
    id: "8",
    name: "Hugo Pereira",
    email: "hugo.pereira@email.com",
    phone: "(11) 91098-7654",
    registrationDate: "2024-08-14",
  },
];