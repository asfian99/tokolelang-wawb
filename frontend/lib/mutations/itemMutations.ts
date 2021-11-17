export interface PostItemResponse {
  id: number;
  account_id: number;
  name: string;
  description: string;
  open_bid: number;
  closing_time: number;
  fundraising: number;
  is_cancelled: number;
  event: string;
  location: string;
  created_at: number;
  updated_at: number;
}
