#### 1.3.8 (2020-12-18)

##### New Features

* **product-edit:** LIV-2484 tooltip-shelf capacity (f100f202)

##### Other Changes

* **product-edit:** LIV-2483 move shelf life capacities downwards (20ac11fd)

#### 1.3.7 (2020-12-18)

##### New Features

* **users-membercard:** LIV-2488 membercard field validation irrespective of submitting (372dcd5d)

##### Bug Fixes

* **ci-cd:**  use docker:stable-dind base image (ed4b7157)

##### Other Changes

* **kiosk-planogram:** LIV-2437 switch state saga and action updated (e869128f)
* **Maintain Planogram:** Main state after updat (33eccd21)
* livello-network/livello-mission-control into staging-master (6e7531ee)

#### 1.3.6 (2020-12-17)

##### Bug Fixes

* **out_of_service:** Invert logic for start and end time, since it works like so in the tablet and the ZVT payment terminal. (72976462)
* **ci-cd:** docker base image to v19 (9285afc5)
* **node:**  base image for docker (72c7a216)
* **docker:**  base image node:12-alpine (8681de01)
* **package:**  gitlab runner updatye (e4aa8e9b)

#### 1.3.5 (2020-12-16)

##### Bug Fixes

* **package.json:**  update gitlab runner credentials (15ed3a61)

#### 1.3.4 (2020-12-16)

#### 1.3.3 (2020-12-16)

##### Bug Fixes

* **security:**  hide security options for API Key Secret. Requested from Operations. (12f2d60d)
* **products_cost:**  calculate on kiosk detail page the real cost of the products. (Code made by Rana) (775cca2f)

##### Other Changes

* **kiosk-manage:** LIV-2516 updated design - service time fields (d5c62b56)
* **out_of_service_time:**  add out of service start and end time for test purposes with the Fridge-cc. NOT FINAL DESIGN. (45920c57)

#### 1.3.2 (2020-12-11)

##### Bug Fixes

* **DesktopLayout-Critial!:** package json used for version number removed (b98fb8af)

#### 1.3.1 (2020-12-11)

### 1.4.0 (2020-12-11)

##### Bug Fixes

* **settings-security:** LIV-2337 code sinppet root removed (fbe08025)

### 1.3.0 (2020-12-11)

##### Bug Fixes

* **settings item:** LIV-2420 no image alignment fix (22d8672e)

##### Other Changes

* **settings-security:**
  * LIV-2337 snippet to show how to use the secret (53c47162)
  * LIV-2337 delete API KEY COMPLETE (48c02674)
  * LIV-2337 updates (263cc791)
  * LIV-2337 create API key generation (250138d2)
* **security page:** LIV-2421 updates (e17855d4)

#### 1.2.52 (2020-12-10)

##### Bug Fixes

* **kiosk-inventory:** LIV-1953 style fixed (503419a3)

#### 1.2.51 (2020-12-10)

##### Build System / Dependencies

* **liv-2415:**  created manage screen for root users (ee312221)

##### Bug Fixes

* **kiosk-inventory:** LIV-1953 decimal fix, style modified for total values (a5cdd562)
* **liv-2434:**  unhide all the planograms (a3973a09)
* **Pricing history:** last 10 prices of products shown on the products page. (455088a4)
* **kiosk inventory:** LIV-2277 merge same products together (6cfc14b4)
* **kiosk planogram:**
  * LIV-2408 load cell text ellepsis removed (39247025)
  *  LIV-2408 load cell text ellipsis (58ff1dd1)
  *  LIV-2408 no image svg style updated (8f2c0fd9)
  * LIV-2408 image alignment, inventory text alignment (e924392c)
* **Kiosk Planogram:** LIV-2408 no image svg style (2edebfca)

##### Other Changes

* //livello.atlassian.net/browse/LIV-1953)show the total sales value (2ae5a517)
* **settings screen:** LIV-2419 settings screen created (c0284ab2)
* **user edit:** LIV-2421 duplicate membercard handling (d01089f9)
* **toolbar:** LIV-2420 user dropdown menu redesign (b2c8c1b6)

##### Code Style Changes

* **toolbar:** LIV-2420 redesigned user dropdown menu (7c5f12f2)

#### 1.2.51 (2020-12-01)

##### Bug Fixes

* **kiosk inventory:** LIV-2277 merge same products together (6cfc14b4)
* **kiosk planogram:**
  * LIV-2408 load cell text ellepsis removed (39247025)
  *  LIV-2408 load cell text ellipsis (58ff1dd1)
  *  LIV-2408 no image svg style updated (8f2c0fd9)
  * LIV-2408 image alignment, inventory text alignment (e924392c)
* **Kiosk Planogram:** LIV-2408 no image svg style (2edebfca)

#### 1.2.51 (2020-11-30)

##### Bug Fixes

* **kiosk planogram:**
  * LIV-2408 load cell text ellepsis removed (39247025)
  *  LIV-2408 load cell text ellipsis (58ff1dd1)
  *  LIV-2408 no image svg style updated (8f2c0fd9)
  * LIV-2408 image alignment, inventory text alignment (e924392c)
* **Kiosk Planogram:** LIV-2408 no image svg style (2edebfca)

#### 1.2.51 (2020-11-30)

##### Bug Fixes

* **kiosk planogram:**
  *  LIV-2408 load cell text ellipsis (58ff1dd1)
  *  LIV-2408 no image svg style updated (8f2c0fd9)
  * LIV-2408 image alignment, inventory text alignment (e924392c)
* **Kiosk Planogram:** LIV-2408 no image svg style (2edebfca)
* **liv-2405:**  Inventory price view collapsed (71dc1035)

##### Other Changes

* **Alerts Grid:**  LIV-2412 grid sorting set to DESC, TabletDisconnected type added. (1d99141d)

#### 1.2.50 (2020-11-30)

##### Bug Fixes

* **alerts:**  Update Tablet Disconnected Alerts (d53bf34b)
* **liv-2405:**  Inventory price view collapsed (71dc1035)

##### Other Changes

* **Alerts Grid:**  LIV-2412 grid sorting set to DESC, TabletDisconnected type added. (1d99141d)

#### 1.2.49 (2020-11-27)

##### Build System / Dependencies

* **liv-2399:**  address change and serial num truncate in kiosk grid (f6d09d33)

##### Bug Fixes

* **Product shefl capacities:**  second case of null check added (878282d9)
* **membercard:** LIV-2380 membercards component validation fixed (500893f8)

#### 1.2.48 (2020-11-23)

##### Bug Fixes

* **user log:**  user log view changed (364ce5d1)
* **user:**  user view and pagination bugs (29bbad09)
* **user view:**  user detail bug fixes (67f3dfce)
* **user edit form:**  LIV-2254 mobile number field (bed3324a)
* **User:**  Changes reflect in users view and pagination setup for user selection accordingly (1274ef04)
* **user edit validations:**  LIV-2254 pdated validations for user edit (8632116e)

##### Other Changes

* **product edit form:** LIV-2125 shelf capacities (94a1c984)
* **product detail:** LIV-2125 shelflife (eaa1e331)

#### 1.2.47 (2020-11-12)

##### Bug Fixes

* **User edit:**  LIV-2254 addres save (745ef916)
* **User detail view:**
  *  LIV-2254 note field added (068bc212)
  * LIV-2254 changed note field (8bae5bae)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into staging-master (d996cb97)
* **user:**  user detail view changes (91551914)
* **User empty user detail:** LIV-2323 (05012403)
* **User edit:** LIV-2254 user edit feature added (1b173d93)

#### 1.2.46 (2020-11-11)

##### Bug Fixes

* **logs and table:**  fixed width for edit pages and table view changed for users (152c765c)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into staging-master (4e0b68f6)

#### 1.2.45 (2020-11-11)

#### 1.2.44 (2020-11-10)

##### Other Changes

* **userlog:** Root user access to grant/revoke (ec2eb8c0)

#### 1.2.43 (2020-11-10)

#### 1.2.42 (2020-11-10)

#### 1.2.41 (2020-11-10)

##### Build System / Dependencies

* **liv-2316:**  user view changes (9487ca4d)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into staging-master (760fc02e)
* **users search:**  LIV-2253 updated for multuple search params (ace4edb0)

#### 1.2.40 (2020-11-10)

##### Bug Fixes

* **UserGrid:**  sort and data type changed (65233c76)

#### 1.2.39 (2020-11-10)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into staging-master (c76dc0ad)
* **Act Log:**  sort and datefilter resolved (552d6cb9)

#### 1.2.38 (2020-11-09)

##### Bug Fixes

* **kiosk-filter:**  show fixed options on the door-status kiosk filter, as requested from operations. (87698a41)

#### 1.2.37 (2020-11-09)

##### Bug Fixes

* **userlog:** Userlog sort Update (39eab2c9)

#### 1.2.36 (2020-11-09)

##### Build System / Dependencies

* **userLog:**  Date filter created and sorted (ddac7ead)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into staging-master (1b390fd5)
* **users search bar:**  LIV-2253 updated (ae632c50)
* **users search:**
  *  LIV-2253 user search bar (be784dc7)
  *  LIV-2253 (0fd80fbc)

#### 1.2.35 (2020-11-05)

##### Bug Fixes

* **kiosk-filter:**  fix doorStatus filter minor-issue (clean filter did not work), and comment code for LIV-2285. (efdb71f7)

#### 1.2.34 (2020-11-04)

##### Bug Fixes

* **user log:**  reload of same page to get username (984d752d)

#### 1.2.33 (2020-11-04)

#### 1.2.32 (2020-11-04)

##### Build System / Dependencies

* **userLog:**  UserLog data with date filter (2450edd7)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into staging-master (ef6b0e48)

#### 1.2.31 (2020-11-04)

##### Bug Fixes

* **merge-conflict:**  solve merge conflicts. (53123f8c)

##### Other Changes

* **kiosk-filter:**  apply filter for the on the kiosks module. Pending from BE add the parameters requested. (5d056702)
* **kiosk_filter:**  fill network status and refactor door status. (e9d80a57)
* **kiosk_filters:**  filter layout with kiosks and door status options. (f36a615e)

#### 1.2.30 (2020-11-04)

##### Bug Fixes

* **dashboard statistics chart:**  LIV-2039 last24Hours bug fix (c20aac34)

##### Other Changes

* **kiosk-filter:**
  *  remove networkStatus from the filter, that should be applied when LIV-2285 is completed and remove logs. (26781ee0)
  *  apply filter for the on the kiosks module. Pending from BE add the parameters requested. (92a0d8ce)
* **kiosk_filter:**  fill network status and refactor door status. (ccde0b83)
* **kiosk_filters:**  filter layout with kiosks and door status options. (a09ebf76)

#### 1.2.29 (2020-11-02)

##### Build System / Dependencies

* **Users:** Users Detail and log UI created (19d741c2)

##### Bug Fixes

* **dashboard statistics graph:**  LIV-2039 graph updated for empty data (a1edfef3)
* **dashboard graph:**
  *  console log removed (9c8f0968)
  *  LIV-2039 comment minutely (97b0edb5)
  * LIV-2039 dahdboard graph updated (a3ba1095)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into staging-master (b1c1bd40)
* **dashboard graph reimplementation:**  LIV-2039 in progress (99f49302)

#### 1.2.28 (2020-10-29)

##### Bug Fixes

* **planogram load cell:** LIV-2233 product default price load fixed (4bbaf17c)
* **getKiosk fetch:**  LIV-2163 bug fix (bc825646)

##### Other Changes

* **liv-2123:**  replace 'getDefaultProductPrice' for a simple comparation to..." (f198dcdd)
* //gitlab.com/livello-network/livello-mission-control into staging-master (ac233065)

#### 1.2.27 (2020-10-23)

##### Bug Fixes

- **date format:** fix date format on dashboard alerts (d2317601)

#### 1.2.26 (2020-10-23)

##### Bug Fixes

- **liv-2123:** replace 'getDefaultProductPrice' for a simple comparation to check wether the price has changed or not. (bad53518)
- **kiosk-alerts:** update grid alerts fetch query (45712e6c)
- **kiosk to null:** resolved kisok to null when page reloads (fc9af49e)

##### Other Changes

- livello-network/livello-mission-control into staging-master (c9fe31e8)

#### 1.2.25 (2020-10-23)

##### Bug Fixes

- **liv-2123:** replace 'getDefaultProductPrice' for a simple comparation to check wether the price has changed or not. (bad53518)
- **kiosk-alerts:** update grid alerts fetch query (45712e6c)
- **kiosk to null:** resolved kisok to null when page reloads (fc9af49e)

##### Other Changes

- livello-network/livello-mission-control into staging-master (c9fe31e8)

#### 1.2.24 (2020-10-23)

##### Bug Fixes

- **liv-2123:** replace 'getDefaultProductPrice' for a simple comparation to check wether the price has changed or not. (bad53518)
- **kiosk-alerts:** update grid alerts fetch query (45712e6c)
- **kiosk to null:** resolved kisok to null when page reloads (fc9af49e)

##### Other Changes

- livello-network/livello-mission-control into staging-master (c9fe31e8)

#### 1.2.24 (2020-10-23)

##### Bug Fixes

- **kiosk-alerts:** update grid alerts fetch query (45712e6c)
- **kiosk to null:** resolved kisok to null when page reloads (fc9af49e)

##### Other Changes

- livello-network/livello-mission-control into staging-master (c9fe31e8)

#### 1.2.23 (2020-10-23)

##### Bug Fixes

- **kiosk-alerts:** update grid alerts fetch query (45712e6c)
- **kiosk to null:** resolved kisok to null when page reloads (fc9af49e)

##### Other Changes

- livello-network/livello-mission-control into staging-master (c9fe31e8)

#### 1.2.22 (2020-10-20)

#### 1.2.21 (2020-10-20)

#### 1.2.21 (2020-10-20)

#### 1.2.19 (2020-10-20)

##### Bug Fixes

- # **kiosk to null:** resolved kisok to null when page reloads (fc9af49e)

* **kiosk to null:** resolved kisok to null when page reloads (fc9af49e)
* **transactions widget date range:** LIV-2148 (b163d7cb)
* **dashboard-customers today:** LIV-1944 (8be74d21)
* **Transaction Sales:** LIV-2131 product line null check (703c46d2)
* **KioskDetails:** LIV-1959 Replenisher Mode string (e0c15f53)

#### 1.2.18 (2020-10-15)

##### Bug Fixes

- **liv-2105:** added msg for empty touchscale and member card read message (c9179ae7)

#### 1.2.17 (2020-10-14)

##### Build System / Dependencies

- **liv-2105:** Added Activity Log for each Kiosk (8caa08b5)

##### Bug Fixes

- **Total net income:** LIV-2040 round off removed (02219d52)

##### Other Changes

- **Total net income:** LIV-2040 round off removed" (7c7a256c)

#### 1.2.16 (2020-10-13)

##### Bug Fixes

- **product net quantiy unit:** LIV-1950 bug fix (63037b56)
- **price history date format:** LIV-1951 (4fd1902e)
- **Product price history:** LIV-1951 Invalid date bug fixed (05de00cd)
- **Planogram:** load cell edit button replacement and alignment (b0f99f59)

##### Other Changes

- **Transactions-Widgets:** LIV-2040 widget for total gross sales (747da292)
- **edit button planogram:** Edit button on the planogram moved to the left..." (a8c326ab)

#### 1.2.15 (2020-10-06)

##### Chores

- **docker file:** remove copy from public (4023fcc6)

##### Other Changes

- **edit button planogram:** Edit button on the planogram moved to the left and load-cell-content centered. (f4a8207d)

#### 1.2.14 (2020-10-05)

##### Continuous Integration

- **increment version stage not neeeded:** Deleted increment version stage (458eda31)

##### Other Changes

- **dependencies:** updated node packages (e8c3f710)

#### 1.2.13 (2020-10-05)

##### Other Changes

- **Disable sales graph in dashboard:** LIV-2019 (0b146284)

#### 1.2.12 (2020-10-05)

##### Continuous Integration

- **increment version stage not neeeded:** Deleted increment version stage (458eda31)

#### 1.2.11 (2020-10-01)

##### Bug Fixes

- **imageUpload:** Closes LIV-2012 (1b683d49)

#### 1.2.10 (2020-10-01)

##### Continuous Integration

- **increment version stage not neeeded:** Deleted increment version stage (94f3c986)

##### Bug Fixes

- **sessionType rewrite:** Closes LIV-2011 (0fc5d6b2)

#### 1.2.9 (2020-10-01)

##### Bug Fixes

- **Kiosks can have NO session:** Kiosk Can have no session to get a Type from (05045c2a)
- **TransactionCount:** LIV-1933 bug fix (1dd7f872)

##### Other Changes

- **Dashboard:** liv-1945 sales statistic graph label change (1cf3a256)
- **NetQuantity:** LIV-1950 (a4439db4)
- **kiosk details:** str refil to replenishment (9005420f)

#### 1.2.8 (2020-09-29)

##### Other Changes

- **cableID:** show cableID on kiosk planogram. (96622c9c)

#### 1.2.7 (2020-09-29)

#### 1.2.6 (2020-09-28)

##### Bug Fixes

- **date format:** fix date format for alerts table on dashboard. (4c26e3ff)

#### 1.2.5 (2020-09-28)

#### 1.2.4 (2020-09-28)

##### Bug Fixes

- **price format:** fix the format for product and kiosk list view. (946a42ac)

#### 1.2.3 (2020-09-22)

##### Bug Fixes

- **TempLoog:** LIV-1837 (42586f53)

#### 1.2.2 (2020-09-14)

##### Bug Fixes

- **toast:** handle toast messages for porudct modification. (2590d1c5)
- **image upload:** fix product image upload from imageuploader.js (2645e4cf)
- **refills:** spoilage rate up to 2 decimals (aef76e72)

##### Other Changes

- **delete picture:** delete product picture with independent endpoint. (d5901355)
- **modal notification:** notify user before update or delete picute. (6d2c327f)
- **product-image:** product image update using endpoint to update image solely. Code refactory pending. (a625572a)

##### Refactors

- **image uploader:** clear code and fix confirmation buttons. (8e26251b)
- **image upload:** clean logs and change var names. (5eef4c40)
- **image update:** clean comments. (1ca8f18a)

#### 1.2.1 (2020-09-14)

##### Refactors

- **image uploader:** clear code and fix confirmation buttons. (8e26251b)

### 1.2.0 (2020-09-11)

##### Bug Fixes

- **image upload:** fix product image upload from imageuploader.js (2645e4cf)

##### Other Changes

- **delete picture:** delete product picture with independent endpoint. (d5901355)
- **modal notification:** notify user before update or delete picute. (6d2c327f)
- **product-image:** product image update using endpoint to update image solely. Code refactory pending. (a625572a)

##### Refactors

- **image upload:** clean logs and change var names. (5eef4c40)
- **image update:** clean comments. (1ca8f18a)

#### 1.1.16 (2020-09-11)

##### New Features

- **alerts:** low temp alert (f2ebe8c7)

##### Bug Fixes

- **typo:** alert high temp (a80f8d71)

#### 1.1.15 (2020-09-11)

##### New Features

- **alerts:** high temp alert (4ada6392)

#### 1.1.14 (2020-09-09)

#### 1.1.13 (2020-09-09)

##### Bug Fixes

- **kiosk edit:** add toFlatLoadCellItem to solve issue. (50aae215)

##### Other Changes

- **product toast alerts:** Removing toast alert for when the user request a product modication or creation. Only notification is when the product was either created or modified successfully. (0e01e7c5)
- **product form:** use history.push for product modification. (f121d5e9)

#### 1.1.12 (2020-09-07)

##### Bug Fixes

- **add scales:** fix add scales button behaviour. (4d719ddc)

##### Other Changes

- **add scales:** add toast alert after editing or adding scale. (5f9d5450)

#### 1.1.11 (2020-09-07)

##### Bug Fixes

- **active scales:** corrected the amount to active scales to the number of products on the planogram. (82656523)

#### 1.1.10 (2020-09-07)

##### Other Changes

- **loadcell modal:** correct alert message (b9ab47da)

#### 1.1.9 (2020-09-04)

##### Bug Fixes

- **transaction:** modify the toast attributes to avoid alerts missunderstandings. (c512555d)
- **Dashboard Sales Graph:** LIV-1830 bug fix (010551e1)
- **Dashboard Chart:** Header Style LIV-1830 (defbb066)
- **Dashboard Satistics:** LIV-1830 (fd496a95)

##### Other Changes

- **kiosk:** send toast message when kiosk information is updated. (2c71b431)
- **productLine:** send a toast message when productes are modified or created. (dfe55039)
- **transactions:** send a toast message when files start to download. (d4cb8757)

##### Refactors

- **productLines:** change toast alert color, icon and messages. (5a22230b)

#### 1.1.8 (2020-09-03)

##### Bug Fixes

- **liv-1799:**
  - enable page return when product is updated or created. (6c529b92)
  - fix history increment when it is not necessary. (c4c11d9a)

##### Other Changes

- //gitlab.com/livello-network/livello-mission-control into staging-master (5e1e63b4)

#### 1.1.7 (2020-08-31)

##### Bug Fixes

- **Temperature Log Viz.:** November changed to Nov (9c175cdc)

##### Other Changes

- **button:**
  - refill & sales buttons icon fixed. (85ef832c)
  - use correct button format on download button. (58e43cbd)
- **Temp. Log Table:** LIV-1779 (ac5cff7c)

#### 1.1.6 (2020-08-31)

##### Bug Fixes

- **refills:** fix cat var for refills search. (73f6825e)
- **reffils:** improve page layout for toolbar. (db002275)

##### Refactors

- **refills:** filter kiosk as object instead of string. (3adba97a)

#### 1.1.5 (2020-08-27)

##### Chores

- **User Type in Menu bar:** LIV-1596 (c61b63ac)

##### Bug Fixes

- **Dashboard KPI Widgets:** LIV-1761 bug fix (399598aa)

##### Other Changes

- **liv-1638:** use semantic alert when updating product location on planogram. (a50a5a17)
- **Tempreature Logs:** LIV-1769 Temperature log visualization (1c5bd5e6)
- **Alert:** CustomAlert component (67dca79d)
- **Temperature Logs:** LIV-1769 (e1a4942d)

##### Code Style Changes

- **Empty table:** LIV-1569 (0c94e097)

#### 1.1.4 (2020-08-21)

#### 1.1.3 (2020-08-20)

##### Bug Fixes

- **kiosk:**
  - double kiosk planogram (8d607fdd)
  - tab switch headers titles (3562daeb)

#### 1.1.2 (2020-08-20)

##### Chores

- **Organizations Grid Resolver:** LIV-1746 (584cd4ca)

##### Bug Fixes

- **Kiosk Listing:** bug fix LIV-1668 address (0f0e54fe)
- **Kiosk details:** Addres field refactor LIV-1669 (68b62784)
- **Transactions-Header Clickable:** bug LIV-1670 (cc16b06d)
- **Transactions - Remove Alerts:** LIV-1749 (d94bd5ff)
- **Dashboard Alerts:** Sort arrow icon desc by defaul (8c7b42e2)
- **Kiosk Grid Resolver and Search:** LIV-1747 (091573d0)

#### 1.1.1 (2020-08-20)

##### Bug Fixes

- **Users grid resolver:**
  - LIV-1736 bug fix (c8ab4d25)
  - LIV-1736 (a15987a9)
- **Kiosk Detail:** LIV-1734 add pin to deatils (e91febe4)
- **Dashboard widgets:** LIV-1691 style (cd0f944b)
- **Transaction:** LIV-1731 Sales Refills sort DESC (4db09921)
- **Grid sorting persistance:** LIV-1666 fixed for AlmostEmptyKiosks & Alerts pages (3172b867)
- **Grid sorting state persistance:** LIV-1666 products (93837b6e)
- **Sorting order persistance:** LIV-1666 fixed for products (3784fc4c)
- **Grid sort persistance:** LIV-1666 (84044980)

##### Other Changes

- **Kiosk Details:** LIV-1721 Notes field (598c8510)
- **Kiosk Notes Field:** LIV-1721 field added (e1a9bb1f)

##### Code Style Changes

- **Dashboard widgets style:** LIV-1691 (360a957c)

### 1.1.0 (2020-08-14)

##### Build System / Dependencies

- **LIV-1667:** updated exportCSV for Sales vars and added exportCsv for Refills. (75b0203b)

##### Bug Fixes

- **Transactions Grid:** LIV-1647 sortable columns updated (b3c1f49b)
- **Kiosk-Address:** Address Name -> Client Name (f6da00ef)
- **Kiosk status:** LIV-1642 hours/days fix (21b76c50)
- **AlmostEmptyKiosks:** null check fixed in the selector (85177762)

##### Other Changes

- **liv-1562:** hide download button and product filter. (9a919283)

##### Code Style Changes

- **Table:** LIV-1665 Table component style update (8ec06fd8)
- **Table-Cursor:** Changed the cursor to a pointer on selectable rows (61272a8b)
- **Transactions-Refills:** LIV-1650 Refills tabl (e2a46729)

#### 1.0.13 (2020-08-14)

##### Build System / Dependencies

- **LIV-1667:** updated exportCSV for Sales vars and added exportCsv for Refills. (75b0203b)

##### Bug Fixes

- **Kiosk-Address:** Address Name -> Client Name (f6da00ef)
- **Kiosk status:** LIV-1642 hours/days fix (21b76c50)
- **AlmostEmptyKiosks:** null check fixed in the selector (85177762)

##### Code Style Changes

- **Table:** LIV-1665 Table component style update (8ec06fd8)
- **Table-Cursor:** Changed the cursor to a pointer on selectable rows (61272a8b)
- **Transactions-Refills:** LIV-1650 Refills tabl (e2a46729)

#### 1.0.12 (2020-08-12)

##### Other Changes

- **liv-1562:** hide download button and product filter. (9a919283)

#### 1.0.11 (2020-08-12)

##### Bug Fixes

- **createRefill:**
  - createSession redux state bug fixed (66dd6674)
  - Saga critical fix (35781c19)

##### Other Changes

- **liv-1586:** cleaning comments. (582f1b98)
- **LIV-1586:** debugging session status (248468b2)
- **Dashboard:** LX-25 KPI Summary Widgets (80440883)

#### 1.0.10 (2020-08-11)

##### Bug Fixes

- **LIV-1586:** open door fixed, but not updated in the frontend (work in progress). (d363870e)

#### 1.0.9 (2020-08-11)

##### Bug Fixes

- **LIV-1567:** comment category and family from productDetail. (7c5066ba)

#### 1.0.8 (2020-08-11)

##### Bug Fixes

- **LIV-1593:** enhanced return page process after updatig or adding productLine. (285b44a9)

##### Other Changes

- //gitlab.com/livello-network/livello-mission-control into staging-master (36ac1bd9)

#### 1.0.7 (2020-08-11)

##### Chores

- **merge:** merge latest staging to prod (4bf1dca6)

##### Bug Fixes

- **Language select:** LIV-1656 Hide language select (815b7eba)
- **Kiosk-Details:**
  - LIV-1598 Resolve organization name (6f5b0290)
  - LIV-1598 Resolve organization name (939d07ff)
- **Kiosk status:** LIV-1642 space issue fixed (aabe0d7c)
- **Notifications:** LX-22 Notification indicator is hidden (ab84161a)
- **kiosk edit:** LIV-1651 Address name is added to the kiosk form and is mandatory (74fcbb72)
- **Add Scale:**
  - LIV-1588 Cable ID validation (20c3acd8)
  - LIV-1588 Cable ID validation (4af812d4)
- **LIV-1499:** Product dropdown list on load cell config - root users to get data based on the organization context (5c704744)
- **Products-Detail:** LIV-1594 Remove tags input field (cab5da82)

##### Other Changes

- **Transactions-Refills:** LIV-1650 Group multiple rows of products into a single transaction row (91ad9368)
- **Transaction-Sales:** add a column for membercardId (d8e6f5c7)
- **Kiosk-Details:** LIV-1598 Resolve organization name (44ecb215)

##### Refactors

- **Kiosk Details:** LIV-1592 Remove activity log button (e2f6ab79)

##### Code Style Changes

- **Kiosk status:** LIV-1642 online/offline (b160fd09)
- **Kiosks Overview:** LIV-1641 Remove sales column (b22cf084)
- **Kiosk details:** LIV-1583 removed static icon (0431af3a)
- **Login Button:**
  - Renamed to Sign in (da82fd40)
  - LIV-1632 Login button icon removed (c893af51)
- **Transactions-Refills:**
  - LIV-1599 Rename column name to price (4dca4195)
  - Refills table and tab label corrected (251be210)
- **Transaction-Sales:** Added price column to the table (7fda5f3d)

#### 1.0.6 (2020-08-10)

##### Bug Fixes

- **liv-1593:** enable page return after editing or submitting a new productLine, and replace initial values for pkg description and ean. (64c6cd9b)
- **Kiosk-Details:** LIV-1598 \ Resolve organization name (1294d8ca)

#### 1.0.5 (2020-08-07)

##### Bug Fixes

- **LIV-1593:** make parameters optional and disable page return after product modification or creation (temporarily). (16789a7a)

#### 1.0.4 (2020-08-05)

##### Bug Fixes

- **LIV-1591:** enable notification when editing and adding products + redirection. (b44cb9d5)
- **LIV1587:** change submit label for save when editing a product. (a7ceb05a)
- **Kiosk-Details:** LIV-1598 Resolve organization name (0f42b49b)

#### 1.0.3 (2020-08-05)

##### Code Style Changes

- **Transactions-Sales:** Table data styling updated (6ccc8ea6)
- **Transactions-sales:**
  - Transactions - Sales Table updated (f82f60f4)
  - Transactions - Sales Table updated (654fc9f7)

#### 1.0.2 (2020-07-30)

##### Build System / Dependencies

- **LIV-1489:**
  - add error handling to exportCsv. (ff2eba22)
  - add button to sales page. (73dcf59d)

#### 1.0.1 (2020-07-30)

##### Bug Fixes

- **transactions:** fix table styles and merge to prod (d09d9362)

##### Other Changes

- **LIV-1489:** merge with stagning. (8d101f72)

##### Reverts

- **pipeline:** revert previous changes on the pipeline. Problem was solved by using standard service from gCloud. (ad712c7f)

## 1.0.0 (2020-07-30)

##### Chores

- **remove mock-ups:** remove all dummy components (22a00617)

##### Bug Fixes

- **LIV-1489:** fix merge conflict. (19d3f694)
- **Transactions tables fixes:** Transactions tables fixes (f59db268)

### 0.11.0 (2020-07-30)

##### Build System / Dependencies

- **LIV-1489:** download CSV button for replenisher page. (2b5b5860)

##### Other Changes

- //gitlab.com/livello-network/livello-mission-control into staging-master (53281c61)
- **transactions:** fix table styles and merge to prod (d09d9362)
- **Transactions tables fixes:** Transactions tables fixes (f59db268)

##### Other Changes

- //gitlab.com/livello-network/livello-mission-control into staging-master (53281c61)
- **LIV-1295:** enable supplier list on the product list page. (00ff3747)
- **liv-1295:** Showing the list of manufacturers on productList page (not unique). (0286adf4)

##### Reverts

- **pipeline:** revert previous changes on the pipeline. Problem was solved by using standard service from gCloud. (ad712c7f)

##### Code Style Changes

- **kiosk detail:** clean kiosk detail section. (286e7477)

### 0.10.0 (2020-07-24)

##### Code Style Changes

- **kiosk detail:** clean kiosk detail section. (286e7477)

### 0.9.0 (2020-07-24)

##### Other Changes

- **LIV-1295:** enable supplier list on the product list page. (00ff3747)
- **liv-1295:** Showing the list of manufacturers on productList page (not unique). (0286adf4)

#### 0.8.2 (2020-07-23)

##### Reverts

- **LIV-1537:** revert LIV-1537 until LIV-1556 is solved. (3211166e)

#### 0.8.1 (2020-07-23)

##### Bug Fixes

- **LIV-1537:** color change and new icon position for DELETE PRODUCT (b225d68d)

##### Other Changes

- livello-network/livello-mission-control into staging-master (375277fc)

### 0.8.0 (2020-07-23)

##### Bug Fixes

- **LIV-1537:** color change and new icon position for DELETE PRODUCT (b225d68d)
- **pipe:** add git garbage collection (71ede05b)

#### 0.7.15 (2020-07-23)

##### Bug Fixes

- **Transactions:** fixed transactions screen (056f8b0f)

#### 0.7.14 (2020-07-22)

##### Bug Fixes

- **update pipe scripts:** add buffer size conf (48084c66)

#### 0.7.13 (2020-07-22)

##### Bug Fixes

- **git upload protocol verion:** change git config for runner pipe to use HTTP1 (11237a9e)

#### 0.7.12 (2020-07-22)

##### Chores

- **liv-1537:** button to delete productLine. (162590fa)

##### Bug Fixes

- **refills:** remove coordinates type for refill grid (dad88f05)

##### Other Changes

- //gitlab.com/livello-network/livello-mission-control into staging-master (bc1546f1)

##### Reverts

- **pipeline:** revert previous changes on the pipeline. Problem was solved by using standard service from gCloud. (d0279964)

#### 0.7.11 (2020-07-21)

##### Chores

- **liv-1537:** button to delete productLine. (162590fa)

##### Other Changes

- //gitlab.com/livello-network/livello-mission-control into staging-master (bc1546f1)

##### Reverts

- **pipeline:** revert previous changes on the pipeline. Problem was solved by using standard service from gCloud. (d0279964)

#### 0.7.10 (2020-07-21)

##### Bug Fixes

- **multiple:** merge staging into production (d5584497)
- **pipeline:** patch for RPC error. (3aa0591c)

#### 0.7.9 (2020-07-21)

##### Bug Fixes

- **LIV-1310:** workaround to present productLine name and img after kioskReset. (40463281)

#### 0.7.8 (2020-07-21)

##### Bug Fixes

- **ci/cd:** pipe fix, increase buffer size (55ca65cf)

#### 0.7.6 (2020-07-20)

##### Code Style Changes

- **features:** disable buttons that are not ready for production. (32d03fec)

#### 0.7.5 (2020-07-16)

##### Bug Fixes

- **LIV-1497:** use tax instead of taxHistory for productDetails. (598fe0dc)

#### 0.7.4 (2020-07-16)

##### Other Changes

- **pipeline:** debug. (71394baa)

#### 0.7.3 (2020-07-16)

#### 0.7.2 (2020-07-16)

##### Bug Fixes

- **LIV-1470:** bug fixed by replacing ownerOrganization by orgId on files. (4c9ca13b)
- **LIV-1473:** marked PIN field as required when creating a kiosk. (96493b15)

#### 0.7.1 (2020-07-16)

##### Bug Fixes

- **LIV-1466:** enable kiosk creation from MC. (612bd4a7)

##### Other Changes

- //gitlab.com/livello-network/livello-mission-control into staging-master (adfc0b13)
- //gitlab.com/livello-network/livello-mission-control into staging-master (dbff1891)
- //gitlab.com/livello-network/livello-mission-control into staging-master (c9e27848)
- //gitlab.com/livello-network/livello-mission-control into staging-master (13466e79)

### 0.7.0 (2020-06-26)

##### New Features

- **add npm release scripts:** added npm scripts to relese patch minor and major versions (68140af9)

##### Other Changes

- //gitlab.com/livello-network/livello-mission-control into staging-master (adfc0b13)
- //gitlab.com/livello-network/livello-mission-control into staging-master (dbff1891)
- //gitlab.com/livello-network/livello-mission-control into staging-master (c9e27848)
- //gitlab.com/livello-network/livello-mission-control into staging-master (13466e79)

#### 0.6.5 (2020-06-26)

##### New Features

- **add npm release scripts:** added npm scripts to relese patch minor and major versions (68140af9)

##### Other Changes

- //gitlab.com/livello-network/livello-mission-control into staging-master (adfc0b13)
- //gitlab.com/livello-network/livello-mission-control into staging-master (dbff1891)
- //gitlab.com/livello-network/livello-mission-control into staging-master (c9e27848)
- //gitlab.com/livello-network/livello-mission-control into staging-master (13466e79)

#### 0.6.5 (2020-06-26)

##### Other Changes

- //gitlab.com/livello-network/livello-mission-control into staging-master (adfc0b13)
- //gitlab.com/livello-network/livello-mission-control into staging-master (dbff1891)
- //gitlab.com/livello-network/livello-mission-control into staging-master (c9e27848)
- //gitlab.com/livello-network/livello-mission-control into staging-master (13466e79)
