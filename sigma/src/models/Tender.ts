export interface Tender {
  id: string;
  ref_no: string;

  title: string;
  client_name: string;
  status: "Draft" | "In Progress" | "Submitted" | "Won" | "Lost" | "Cancelled";

  responsible_person_id: string;
  team_ids: string[];

  pre_bid_meeting: Date | null;
  submission_deadline: Date;
  submission_method: "Online" | "Offline" | "Both";

  portal_url: string;
  source_url: string;
  contact_no: string;
  contact_email: string;

  pre_bid_reminder: Date | null;
  submission_reminder: Date;

  notes: string;

  created_at: Date;
  updated_at: Date;
}
