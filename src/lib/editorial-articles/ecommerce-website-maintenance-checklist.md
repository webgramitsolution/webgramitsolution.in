An ecommerce maintenance plan should cover checkout availability, updates, backups and the time it takes someone to respond when orders stop working. Start with the tools your store relies on and name an owner for each. Review the store from the point of view of a customer buying on a phone and a staff member fulfilling the order.

## Decide what needs monitoring

### Follow an order through the entire store

A homepage that loads tells you little about whether an order can move from product selection to dispatch. Check the product page, cart, shipping calculation, payments, confirmation email and stock update. Choose a few sample products representing common and awkward cases, such as a configurable item or a product available only in a particular city. Where safe, use a test environment or an agreed test transaction.

Track failures alongside customer-facing symptoms. A payment success followed by an unpaid order status needs investigation even if the gateway’s status page looks healthy. A courier integration may accept the order and still fail to generate a label. Decide what volume or duration of failure triggers an alert and where that alert goes. Give the receiving team a short procedure they can follow during an incident.

### Record who owns external services

Inventory, email, checkout and fulfilment often depend on several subscriptions. Keep a service register with its owner, renewal date, technical contact and the step it supports. If a theme relies on an app, record who can enable it and who checks when it changes. Some outages can only be resolved by a provider. Your maintenance plan can still define who opens and tracks that ticket.

## Update carefully on each platform

WooCommerce work often involves WordPress, the theme, PHP and several extensions. Review compatibility before applying a change. Test a checkout, creation of an order, a refund where supported and any affected integration in a safe copy of the site. Record changes and keep the path to restore a previous version clear. A hosted store such as Shopify has different infrastructure responsibilities, but theme modifications, app permissions and third-party integrations still need review.

- Check upcoming changes to gateway notifications, shipping rules or an API.
- Keep a record of changed plugins, app settings and theme files.
- Decide who signs off on changes close to a major sale.
- Remove stale test accounts and review which staff need administrator access.
- Give support staff a known escalation channel when the business sees failures.

Make one identifiable change at a time where practical. If a theme deployment and gateway change happen together, later investigation becomes harder. Tell the people who manage orders what changed so they can report specific symptoms. Include dates and test evidence in the change log.

## Plan backups around recovery

### Ask how much data the business can lose

A daily copy may be adequate for pages that change slowly, but a store that receives orders throughout the day may need a more frequent recovery process. Discuss how much information could be lost and how long the store can be down before operations are affected. Decide how staff could reconstruct orders placed after the last recoverable backup, including gateway and fulfilment records.

Verify what the backup contains. Depending on the platform it may cover files, database, product media, theme exports, order exports and custom integration configuration. Some SaaS tools hold useful data outside the main store backup. Record which systems need separate exports or recovery access. Keep keys and passwords in the approved vault rather than in plain files bundled with a backup.

### Prove that recovery is possible

Restore a recent copy to a protected test environment. Check that the front end loads, staff can sign in, products and orders are present and integrations stay isolated from production. Time the restore and document steps that require someone’s approval. Review the result with the store owner and agree who authorises a production rollback.

## Run a monthly operating review

Review failed payments, redirects, broken forms, stock sync failures and any unresolved support requests. Check changes in search traffic and checkout behaviour in the context of campaigns and product availability. Ask whether a drop relates to site errors, merchandising, price changes or an external outage. Make one owner responsible for each action.

A short report can list what changed, what was tested, which issues remain and what renewals or vendor changes are coming. Attach evidence a manager can understand, such as a synthetic test timestamp or a screenshot of the tested order stage with customer details removed. Use this report to decide which fixes matter ahead of the next trading period.

## Work through a failed-checkout example

An apparel store sees several prepaid orders marked pending after a checkout change. First confirm the gateway outcome, whether orders were created and whether staff have already contacted customers. Freeze unrelated changes. Check event timing and compare the order and payment references. Coordinate with finance before asking customers to retry so they are not charged twice.

If a rollback is needed, agree how to handle orders made since the deployment. After recovery, verify a new order, a failed payment and a refund or cancellation in the appropriate test flow. Record the decision, owner and timeline. The follow-up can include an alert when successful payments have no matching store confirmation within the expected window.

## Agree the scope and priorities in writing

- Define an urgent incident, standard defect and requested improvement.
- Set coverage hours, first-response expectations and escalation contacts.
- Specify who monitors and who pays third-party costs or emergency charges.
- Agree how staff receive reports, access support and request changes.
- Review the plan before seasonal campaigns, migrations and major catalogue releases.

A maintenance agreement should tell your team exactly what happens when an issue is reported and who keeps customers informed. Ask for a repeatable checkout test, a recovery demonstration and a scope your business can review as the store grows.

### Distinguish checks for different times of day

A daily checkout check can spot an outage, while weekly inspection can catch slower problems such as an integration that gradually stops updating a subset of products. Agree which issues warrant immediate attention and which need a periodic review. For example, test a displayed delivery promise in representative PIN codes before a promotion and compare it with the courier service actually offered. Give the support team an approved way to update the promise if service coverage changes temporarily.

Ask for a named backup contact for urgent incidents. If the usual manager is away, staff should still know who can approve a temporary checkout change or contact the gateway.

[Website maintenance services](/services/website-maintenance) · [Payment launch checklist](/blog/payment-gateway-integration-launch-checklist) · [WooCommerce documentation](https://woocommerce.com/documentation/woocommerce/)

## Frequently asked questions

### How often should ecommerce backups run?
Set frequency according to order volume and the amount of data you can afford to reconstruct. Include integration data in the recovery plan and periodically verify that a backup can actually be restored.

### Does Shopify require maintenance?
Shopify manages the hosted platform, while the merchant still needs to review apps, themes, user permissions, catalogue quality, checkout and external integrations.

### What should a maintenance report contain?
List updates, tests, issues, owners and deadlines. Include confirmed restore results when available and flag upcoming vendor changes or renewals that could affect operations.

### Should support include outages caused by external tools?
The agreement should identify who investigates and contacts the provider. Resolution time may depend on the vendor, so distinguish your team’s response and escalation commitments.
