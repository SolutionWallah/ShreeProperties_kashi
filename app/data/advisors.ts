export type Advisor = {
  id: string;
  name: string;
  role: string;
  photo: string;
  phone: string;
  phoneDisplay: string;
};

// Keep advisor names, portraits, and contact numbers in one shared source.
export const advisors: Advisor[] = [
  {
    id: "ashutosh-singh",
    name: "Ashutosh Singh (Himanshu)",
    role: "Property Dealer & Real Estate Consultant",
    photo: "/images/Ashu.webp",
    phone: "+919889028504",
    phoneDisplay: "+91 98890 28504",
  },
  {
    id: "sunil-maurya",
    name: "Sunil Maurya",
    role: "Property Dealer & Real Estate Consultant",
    photo: "/images/SunilM.webp",
    phone: "+917903512516",
    phoneDisplay: "+91 79035 12516",
  },
];

// Build a WhatsApp link with an optional prefilled message for a specific listing.
export function getAdvisorWhatsAppUrl(advisor: Advisor, message?: string) {
  const phoneNumber = advisor.phone.replace("+", "");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";

  return `https://wa.me/${phoneNumber}${query}`;
}
