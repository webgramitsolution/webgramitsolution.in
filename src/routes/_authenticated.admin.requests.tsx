import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, Plus, Save, Send, Star, Trash2 } from "lucide-react";
import { submitToIndexNow } from "@/lib/indexing.functions";

import { AdminShell } from "@/components/admin-blog";
import { Button } from "@/components/ui/button";
import {
  deleteHomepageReview,
  getAdminRequests,
  saveHomepageReview,
  updateRequestStatus,
} from "@/lib/admin-requests.functions";
import { useServerFn } from "@tanstack/react-start";
import { replyToEnquiry } from "@/lib/enquiry.functions";

export const Route = createFileRoute("/_authenticated/admin/requests")({
  head: () => ({
    meta: [
      { title: "Requests & Enquiries | Webgram Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RequestsPage,
});

type Tab = "enquiries" | "indexing" | "tickets" | "reviews";
type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  created_at: string;
  reply_message?: string | null;
  replied_at?: string | null;
};
type Indexing = { id: string; url: string; status: string; created_at: string; user_id: string };
type Ticket = {
  id: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  user_id: string;
};
type Review = {
  id: string;
  customer_name: string;
  customer_role: string;
  company_name: string;
  review_text: string;
  rating: number;
  is_published: boolean;
  display_order: number;
};
const blankReview = {
  customer_name: "",
  customer_role: "",
  company_name: "",
  review_text: "",
  rating: 5,
  is_published: true,
  display_order: 0,
};

const when = (v: string) =>
  new Date(v).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
const statusSets = {
  enquiries: ["new", "contacted", "closed"],
  indexing: ["pending", "done", "rejected"],
  tickets: ["open", "closed"],
} as const;

function RequestsPage() {
  const [tab, setTab] = useState<Tab>("enquiries");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [indexing, setIndexing] = useState<Indexing[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState(blankReview);
  const [error, setError] = useState("");
  async function load() {
    try {
      const result = await getAdminRequests();
      setEnquiries(result.enquiries);
      setIndexing(result.indexing);
      setTickets(result.tickets);
      setReviews(result.reviews);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load requests.");
    }
  }
  useEffect(() => {
    void load();
  }, []);
  const sendReply = useServerFn(replyToEnquiry);
  const pingFn = useServerFn(submitToIndexNow);
  const [pinging, setPinging] = useState<string | null>(null);
  const [pingMsg, setPingMsg] = useState("");
  async function ping(urls: string[], key: string, requestId?: string) {
    setPinging(key);
    setPingMsg("");
    try {
      const r = await pingFn({ data: { urls, requestId } });
      setPingMsg(
        r.ok ? "IndexNow accepted the notification." : `IndexNow returned HTTP ${r.status}.`,
      );
      await load();
    } catch (e) {
      setPingMsg(e instanceof Error ? e.message : "Submit failed.");
    } finally {
      setPinging(null);
    }
  }
  const [replyFor, setReplyFor] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  async function submitReply(id: string) {
    setError("");
    setSending(true);
    try {
      await sendReply({ data: { id, message: replyText } });
      setReplyFor(null);
      setReplyText("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reply failed.");
    } finally {
      setSending(false);
    }
  }
  async function setStatus(t: Exclude<Tab, "reviews">, id: string, status: string) {
    setError("");
    try {
      if (
        t === "enquiries" &&
        (status === "new" || status === "contacted" || status === "closed")
      ) {
        await updateRequestStatus({ data: { queue: t, id, status } });
      } else if (
        t === "indexing" &&
        (status === "pending" || status === "done" || status === "rejected")
      ) {
        await updateRequestStatus({ data: { queue: t, id, status } });
      } else if (t === "tickets" && (status === "open" || status === "closed")) {
        await updateRequestStatus({ data: { queue: t, id, status } });
      }
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update status.");
    }
  }
  async function saveReview(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    try {
      await saveHomepageReview({ data: { ...reviewForm, id: editingReview } });
      setEditingReview(null);
      setReviewForm(blankReview);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save review.");
    }
  }
  function editReview(review: Review) {
    setEditingReview(review.id);
    setReviewForm({
      customer_name: review.customer_name,
      customer_role: review.customer_role,
      company_name: review.company_name,
      review_text: review.review_text,
      rating: review.rating,
      is_published: review.is_published,
      display_order: review.display_order,
    });
  }
  async function deleteReview(id: string) {
    if (!window.confirm("Delete this review?")) return;
    setError("");
    try {
      await deleteHomepageReview({ data: { id } });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete review.");
    }
  }
  const counts = {
    enquiries: enquiries.filter((x) => x.status === "new").length,
    indexing: indexing.filter((x) => x.status === "pending").length,
    tickets: tickets.filter((x) => x.status === "open").length,
    reviews: reviews.filter((x) => x.is_published).length,
  };
  const Status = ({ t, id, value }: { t: Exclude<Tab, "reviews">; id: string; value: string }) => (
    <select
      aria-label="Status"
      value={value}
      onChange={(e) => void setStatus(t, id, e.target.value)}
      className="h-9 rounded-md border border-input bg-card px-2 text-xs font-bold uppercase text-navy"
    >
      {statusSets[t].map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
  return (
    <AdminShell>
      <main className="page-shell py-8">
        <p className="page-eyebrow text-primary">Review queue</p>
        <h1 className="mt-2 text-3xl font-extrabold text-navy">Requests &amp; Enquiries</h1>
        <div className="mt-5 flex gap-2 overflow-x-auto">
          {(
            [
              ["enquiries", "Website enquiries"],
              ["indexing", "Indexing requests"],
              ["tickets", "Support tickets"],
              ["reviews", "Homepage reviews"],
            ] as const
          ).map(([k, l]) => (
            <Button
              key={k}
              variant={tab === k ? "default" : "outline"}
              onClick={() => setTab(k)}
              className={`shrink-0 font-bold ${tab === k ? "bg-navy text-on-dark" : "bg-card text-navy"}`}
            >
              {l}
              {counts[k] ? (
                <span className="ml-2 rounded bg-gold px-1.5 text-[13px] text-navy">
                  {counts[k]}
                </span>
              ) : null}
            </Button>
          ))}
        </div>
        {error ? <p className="mt-3 text-xs font-semibold text-destructive">{error}</p> : null}
        <div className="mt-4 overflow-hidden rounded-md border border-border bg-card shadow-card">
          {tab === "enquiries" &&
            (enquiries.length ? (
              enquiries.map((r) => (
                <article
                  key={r.id}
                  className="grid gap-4 border-b border-border p-5 last:border-0 md:grid-cols-[1fr_auto]"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-navy">{r.name}</p>
                      <span className="rounded bg-primary-soft px-2 py-1 text-[13px] font-bold uppercase text-primary">
                        {r.service || "General"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Received {when(r.created_at)}
                    </p>
                    <p className="mt-3 whitespace-pre-line text-sm leading-6">{r.message}</p>
                    {r.reply_message ? (
                      <div className="mt-3 rounded-md border border-border bg-sky-soft p-3 text-sm">
                        <p className="text-xs font-bold text-primary">
                          Replied {r.replied_at ? when(r.replied_at) : ""}
                        </p>
                        <p className="mt-1 whitespace-pre-line">{r.reply_message}</p>
                      </div>
                    ) : (
                      <p className="mt-3 text-xs font-bold text-warning">Not replied yet</p>
                    )}
                    {replyFor === r.id ? (
                      <div className="mt-3 grid gap-2">
                        <textarea
                          aria-label={`Reply to ${r.name}`}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={5}
                          placeholder={`Write your reply to ${r.email}…`}
                          className="w-full rounded-md border border-input bg-card p-3 text-sm"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            disabled={sending || replyText.trim().length < 5}
                            onClick={() => void submitReply(r.id)}
                          >
                            <Mail />
                            {sending ? "Sending…" : "Send reply"}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setReplyFor(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setReplyFor(r.id);
                          setReplyText("");
                        }}
                      >
                        <Mail />
                        {r.reply_message ? "Reply again" : "Reply"}
                      </Button>
                      {r.phone ? (
                        <Button asChild size="sm" variant="outline">
                          <a href={`tel:${r.phone}`}>
                            <Phone />
                            Call
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Status t="enquiries" id={r.id} value={r.status} />
                  </div>
                </article>
              ))
            ) : (
              <Empty />
            ))}
          {tab === "indexing" && (
            <div className="flex flex-wrap items-center gap-2 border-b border-border bg-sky-soft p-4">
              <Button
                size="sm"
                disabled={!!pinging}
                onClick={() =>
                  void ping(
                    [
                      "https://webgramitsolution.in/",
                      "https://webgramitsolution.in/services/website-design",
                      "https://webgramitsolution.in/solutions/website-design-development",
                      "https://webgramitsolution.in/solutions/ecommerce-development",
                      "https://webgramitsolution.in/blog",
                      "https://webgramitsolution.in/contact",
                    ],
                    "main",
                  )
                }
              >
                <Send />
                {pinging === "main" ? "Submitting…" : "Notify IndexNow about main pages"}
              </Button>
              <a
                className="px-2 text-xs font-semibold text-primary underline"
                href="https://search.google.com/search-console?resource_id=sc-domain%3Awebgramitsolution.in"
                target="_blank"
                rel="noreferrer"
              >
                Google Search Console
              </a>
              {pingMsg ? <p className="text-xs font-semibold text-navy">{pingMsg}</p> : null}
            </div>
          )}
          {tab === "indexing" &&
            (indexing.length ? (
              indexing.map((r) => (
                <div
                  key={r.id}
                  className="grid gap-3 border-b border-border p-4 last:border-0 md:grid-cols-[1fr_auto] md:items-center"
                >
                  <div className="min-w-0">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate font-bold text-primary"
                    >
                      {r.url}
                    </a>
                    <p className="text-xs text-muted-foreground">
                      {when(r.created_at)} · user {r.user_id.slice(0, 8)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!!pinging}
                      onClick={() => void ping([r.url], r.id, r.id)}
                    >
                      <Send />
                      {pinging === r.id ? "Submitting…" : "Notify IndexNow"}
                    </Button>
                    <Status t="indexing" id={r.id} value={r.status} />
                  </div>
                </div>
              ))
            ) : (
              <Empty />
            ))}
          {tab === "tickets" &&
            (tickets.length ? (
              tickets.map((r) => (
                <div
                  key={r.id}
                  className="grid gap-3 border-b border-border p-4 last:border-0 md:grid-cols-[1fr_auto]"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-navy">{r.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {when(r.created_at)} · user {r.user_id.slice(0, 8)}
                    </p>
                    <p className="mt-2 whitespace-pre-line text-sm">{r.message}</p>
                  </div>
                  <Status t="tickets" id={r.id} value={r.status} />
                </div>
              ))
            ) : (
              <Empty />
            ))}
          {tab === "reviews" ? (
            <div className="grid gap-5 p-5 lg:grid-cols-[1fr_340px]">
              <div className="space-y-3">
                {reviews.length ? (
                  reviews.map((review) => (
                    <article key={review.id} className="rounded-md border border-border p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <strong className="text-navy">{review.customer_name}</strong>
                          <p className="text-xs text-muted-foreground">
                            {[review.customer_role, review.company_name]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        </div>
                        <span
                          className={`rounded px-2 py-1 text-[13px] font-bold uppercase ${review.is_published ? "bg-success-soft text-success" : "bg-muted text-muted-foreground"}`}
                        >
                          {review.is_published ? "Published" : "Hidden"}
                        </span>
                      </div>
                      <div className="mt-2 flex gap-1 text-gold">
                        {Array.from({ length: review.rating }, (_, index) => (
                          <Star key={index} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="mt-3 text-sm leading-6">{review.review_text}</p>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => editReview(review)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => void deleteReview(review.id)}
                        >
                          <Trash2 />
                          Delete
                        </Button>
                      </div>
                    </article>
                  ))
                ) : (
                  <Empty />
                )}
              </div>
              <form
                onSubmit={saveReview}
                className="h-max space-y-3 rounded-md border border-border p-4 lg:sticky lg:top-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-extrabold text-navy">
                    {editingReview ? "Edit review" : "Add review"}
                  </h2>
                  {editingReview ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingReview(null);
                        setReviewForm(blankReview);
                      }}
                    >
                      <Plus />
                      New
                    </Button>
                  ) : null}
                </div>
                <input
                  required
                  placeholder="Customer name"
                  value={reviewForm.customer_name}
                  onChange={(e) => setReviewForm({ ...reviewForm, customer_name: e.target.value })}
                  className="h-10 w-full rounded-md border border-input px-3 text-sm"
                />
                <input
                  placeholder="Role"
                  value={reviewForm.customer_role}
                  onChange={(e) => setReviewForm({ ...reviewForm, customer_role: e.target.value })}
                  className="h-10 w-full rounded-md border border-input px-3 text-sm"
                />
                <input
                  placeholder="Company"
                  value={reviewForm.company_name}
                  onChange={(e) => setReviewForm({ ...reviewForm, company_name: e.target.value })}
                  className="h-10 w-full rounded-md border border-input px-3 text-sm"
                />
                <textarea
                  required
                  minLength={20}
                  placeholder="Review"
                  value={reviewForm.review_text}
                  onChange={(e) => setReviewForm({ ...reviewForm, review_text: e.target.value })}
                  className="min-h-32 w-full rounded-md border border-input p-3 text-sm"
                />
                <label className="block text-xs font-bold text-navy">
                  Rating
                  <select
                    value={reviewForm.rating}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, rating: Number(e.target.value) })
                    }
                    className="mt-1 h-10 w-full rounded-md border border-input px-3"
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} stars
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs font-bold text-navy">
                  Display order
                  <input
                    type="number"
                    min="0"
                    value={reviewForm.display_order}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, display_order: Number(e.target.value) })
                    }
                    className="mt-1 h-10 w-full rounded-md border border-input px-3"
                  />
                </label>
                <label className="flex items-center gap-2 text-xs font-bold">
                  <input
                    type="checkbox"
                    checked={reviewForm.is_published}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, is_published: e.target.checked })
                    }
                  />
                  Published on homepage
                </label>
                <Button className="w-full">
                  <Save />
                  Save review
                </Button>
              </form>
            </div>
          ) : null}
        </div>
      </main>
    </AdminShell>
  );
}

function Empty() {
  return <p className="p-8 text-center text-sm text-muted-foreground">Nothing here yet.</p>;
}
