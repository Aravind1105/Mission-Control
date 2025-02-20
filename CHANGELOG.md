### 1.5.0 (2021-12-24)

##### New Features

* **Reports:**  LIV-3295 Add Line Chart for Profit (39d092d9)
* **reports:**  add date filter for current month and whole data (58da135e)

##### Bug Fixes

* **Reports:**  LIV-3298 update kiosk filter for reports (ae4f7dcc)
* **reports:**
  *  LIV-4253 placheolder fix and handle null values (3836f1b8)
  *  LIV-4253 LIV-3901 fixed session created and kiosk filter (d0eb6b32)
  *  loading and widgets fix for every component (9884fc56)
* **transcations:**  LIV-4181 LIV-4255 remove duplicate graphqls and request... (70a0ed2a)

#### 1.4.34 (2021-12-23)

##### New Features

* **reports:**  add date filter for current month and whole data (58da135e)
* **Reports:**  LIV-3295 Add Line Chart for Profit (9cc03f2a)

##### Bug Fixes

* **Reports:**
  *  LIV-3298 update kiosk filter for reports (ae4f7dcc)
  *  LIV-3295 Net Sales/Profit/ Net Cost Updated (d25cb297)
  *  LIV-3295 Net Sales/Profit/ Net Cost Y-Axis Issue Resolved (f17fad86)
* **reports:**
  *  LIV-4253 placheolder fix and handle null values (3836f1b8)
  *  LIV-4253 LIV-3901 fixed session created and kiosk filter (d0eb6b32)
  *  loading and widgets fix for every component (9884fc56)
* **transcations:**  LIV-4181 LIV-4255 remove duplicate graphqls and request... (70a0ed2a)
* **MC-Reports:**  LIV-3295 Net Sales/Profit/ Net Cost diagram (d564cba2)

#### 1.4.33 (2021-12-16)

##### New Features

* **kiosks:**  LIV-3901 Adding a new column session in the kiosk table (f1d26f7f)

##### Bug Fixes

* **Reports:**  LIV-3296 Update Top Selling Product Rank Column, Refills and sold Products component (f2917599)
* **dashboard, kiosks, organizations, users, products, reports, transactions:**  LIV-3820 Update the padding of tables row (f10e190e)
* **transacrtions:**  Hover fix for table body and table row (cfb441c8)
* **reports:**  LIV-3295 Modifying revenue reports graph to show cumulative value (b00e2557)

#### 1.4.32 (2021-12-15)

##### Bug Fixes

* **dashboard, kiosks, organizations, users, products, reports, transactions:** ... (6b10c0e8)
* **refils:** LIV-3956 export CSV with date range filter bug fix (b61331cb)

#### 1.4.31 (2021-12-14)

##### New Features

* **reports:** LIV-4122 sold products graph for weekly and daily complete (431ffa96)
#### 1.4.31 (2021-12-02)

##### New Features

* **kiosks:**
  *  LIV-3901 Adding a new column session in the kiosk table (5824e03e)
  * LIV-3986 kiosk serial numbers validation on kiosk creation (f1fad8f6)
* **reports:**
  * LIV-4122 sold products graph for weekly and daily complete (431ffa96)
  * [LIV-3295] add Net Sales/Profit/ Net Cost graph (ece8f0c7)
  * LIV-3297 topSellingKiosks integration (32d50ebc)
  * LIV-3790 table component updated for tooltip (8c398e57)
  * LIV-3970 reports table component updated for tooltip (7928fbf4)
  * LIV-3970 reports table component updated (40449600)
  * LIV-3970 reports table component updated (cd78ea9d)
  * LIV-3970 table component css updated (60ffd1ac)
  * LIV-3970 new table component (da302482)
  * LIV-3294 widgets and module cleanup (f65cef90)
  * LIV-3294 reports widget (2840ae43)
  * cleanup module (c4d79d7a)
* **product form:**
  * LIV-4043 selector updated as per the input component with... (5f04b1fe)
  * LIV-4043 selector updated as per the input component with... (9c84e607)
  * LIV-4043 selector updated as per the input component with... (fe3ef436)
  * LIV-4043 selector updated as per the input component with... (12a9068c)
* **LIV-4031:**  updated cardId in the sales table (f9e82b57)
* **msg:**  payment terminal message format changed (2e6d1a56)
* **transactions:** LIV-3842 Adding changes to set a default date for the current month in the transactions page (8aad8b61)
* **refill:**  LIV-3740 updating transaction refills grid with the refill column (cd501811)

##### Bug Fixes

* **kiosks:**  [LIV-4183] Redirect to kiosk details (b0ccc2bd)
* **LIV-4101:**  cardID added in graphql fixed (b8c239aa)
* **Notification Bell:**  LIV-3772 Hiding Notification Button (87b2e8a7)
* **Transactions:**  LIV-3996 Products Table Fixed Table headers width during sorting operations (18f09077)
* **product form:** LIV-4133 product form family bug fix, net weight fix (c6660e1f)
* **components:**
  * LIV-3991 custom dropdown component with keyboard events implemented (efc32257)
  * LIV-3991 form dropdown component updated (ccb521ca)
  * LIV-3991 new custom form dropdown component (90353aac)
  * LIV-3991 custom dropdown component (1c3bf1b0)
  * LIV-2787 multi select chck box options - clear button (0cb96893)
  * LIV-2787 outside click handler for multiple selection options (a849d128)
* **reports widget:** LIV-3294 average daily revenue and peak sales hour widgets (967e3f28)
* **nwStatus:**  update temp and heartbeat for nw status (6f6fdb71)
* **dashboard:** LIV-3895 multiple kiosk selection for sales graph (35cff32b)
* **kiosk overview:** LIV-3737 kiosk filter removed (8c7e8dfd)
* **multiple seleciton kiosk:** LIV-3844 optimizaitions (6e807904)
* **products:** LIV-3788 manufacturers multiple selection (583ded4e)
* **LIV-3839:**  added alert for invalid scale readings (07fb3a0c)
* **products listing:** LIV-3788 removed category column from products page (de8734fa)
* **teansactions-products:** LIV-3786 multiple kiosk filter for transaction products (2c186e7d)
* **test:**  added test url for test env (a129bda3)
* **transactions refills:** LIV-3726 multiple kiosk filter and updated widgest and CSV (2c9b415d)
* **alerts page:** LIV-3785 multiple kiosk selection filter (aa22626c)
* **kiosk list page:** LIV-3727 multiple kiosk filtering (43c15424)
* **transaction sales:** LIV-2787 CSV export for sales (4c580c0d)
* **transactions sales:** LIV-2787 CSV (13d99894)
* **ci-cd:**  add test-master deployments (88c3f3c6)
* **transactions-sales:** LIV-2787 multiple kiosk filtering (83295102)
* **Components:** LIV-2787 multiple selection component (ea5f090f)

##### Bug Fixes

* **Notification Bell:**  LIV-3772 Hiding Notification Button (87b2e8a7)
* **Transactions:**  LIV-3996 Products Table Fixed Table headers width during sorting operations (18f09077)
* **product form:**
  * LIV-4133 product form family bug fix, net weight fix (c6660e1f)
  * product form EAN fix (f2eaeea5)
  * LIV-3929 product create hot fix (1512dc18)
* **message:**  chk null before terminal messages (e52b6318)
* **LIV-3999:**
  *  fixed data replicate and added field validation (c2143264)
  *  fixed kiosk with prod and loader and product to null initially for detail page. (3fd269c1)
  *  fixed kiosk with prod and loader and product to null initially for detail page. (8bd8e475)
* **Kiosks:**
  *  LIV-4045 Button Add to Update Button Option (d98f38f6)
  *  LIV-4045 Show tooltips for new planogram and Add/Update Button Option (172109ae)
* **kiosk:**
  *  LIV-3738: adding changes to make refill type as enum (8f80ff6e)
  *  [LIV-3226] Inventory list fix (7bf607ad)
  *  Resolve LIV-3372 update kiosk form (f3cfbce4)
  *  Resolve LIV-3226 fix inventory table (2301df3b)
  *  Resolve LIV-3382 chart sensor values (b92b2f5d)
  *  LIV-3371 Adding frontend changes for kiosk table sorting based on organization name (f4144409)
* **node:**  adjust base image to 14-alpine als lts switched to node 16 (ba6db126)
* **reports:**
  * reports UI changes according to UX (3a37d3c3)
  * LIV-3297 top selling kiosks fix decimal issue and fix date filter (60458017)
  * LIV-3297 fixing date filters (1d66d1e2)
* **Kiosk Planogram:**  LIV-3502 Applied Validation Add/Edit Scale updated (0e8cf765)
* **components:** LIV-3991 dropdown component issues fixed (8aef4075)
* **kiosk create:** LIV-3986 validate serial numbers on create (bdc8a7d3)
* **Temprature Log:**
  *  LIV-3382 Fixed default value and put loader (f37aebb0)
  *  LIV-3921 Fixed Nan for windows browser (a7a59f46)
* **All Tables:**
  *  LIV-3544 Hower Issue in Transactions Tables (a79bafad)
  *  LIV-3544 Fixed Angular Corner and CSS Overlapping Issue (fbea2d52)
  *  LIV-3544 Fixed Angular Corner and CSS Overlapping Issue (f38f6ca6)
* **refils:** LIV-3956 export CSV with date range filter bug fix (1bb3a6ff)
* **Define button Color:**
  *  LIV-3213 Fixed product page edit/add cancel button updated for Organization and products (d2fedfef)
  *  LIV-3213 Fixed product page edit/add cancel button updated (eac7551f)
* **Planogram Hyphenation:**  LIV-3551 Fixed text hyphensation issue in planogram (d8655e0f)
* **All Tables Update Corners:**  LIV-3544 Fixed Angular Corner of All Tables (6a17c4fe)
* **Transaction Products Table:**
  *  LIV-3847 transaction Product table Updated (ab898dcd)
  *  LIV-3847 transaction Product table (18679808)
* **Kiosks, Organizations, Products:**
  *  LIV-3871 Organization Tool bar Position for mobile and web updated config (9e85a27c)
  *  LIV-3871 Organization Tool bar Position for mobile and web updated after merge (83bf238b)
  *  LIV-3871 Organization Tool bar Position for mobile and web updated (a9382d6e)
* **Paginaztion dropdown:**  LIV-3855 Updated dropdowns for mobile (7ae6ce96)
* **img:**  img graphql call fixed (d4fa1626)
* **membercard:**  show error message for validation (c3fe83f9)
* **multiple kiosks filter:** LIV-3856 mobile view fetch API call fixed (2cb8c139)
* **Organizations:**  LIV-3871 Organization Tool bar Position for mobile and web (6902f9a1)
* **kiosk detail:** LIV-3831 planogram cellId and planogram position change (c93b55c1)
* **cicd:**  update yaml file (e47b6605)
* **LIV-3583:**
  *  updated alert for every imageupload (8196ca6e)
  *  fixed same image uplaod twice (a62aa0bd)
  *  Updated btn design and msg format (47dcfe3a)
  * fixed img base64 and updated alerts name (29da2db5)
* **url:**  updated BE url for staging (55e3fbb1)
* **Kiosk Planogram Edit/Add Scale:**  LIV-3502 Kiosk Overview Add/Edit Scale (f50a8218)
* **modal:**  modal loadcell popup alert fixed (59feb7c6)
* **Users Details:**  LIV-3876 User Details component Position fixed (31480098)
* **kiosk Inventory Table:**
  *  LIV-3226 Inventory Table Sorted Results (6b3b9740)
  *  LIV-3226 Inventory Table Updated (3082f702)
* **modal load cell:**
  * LIV-3849 fixed wrong error message position changed (dec2189b)
  * LIV-3865 delete load cell confirmation dialog change (a07deeba)
* **Kiosk:**
  *  LIV-3382 Temprature Graph time formate updated (ecc6a6a3)
  *  LIV-3382 Temprature Graph time formate (57215ef3)
  *  LIV-3226 Inventory List Tooltip Updated (60ac4066)
  *  LIV-3226 Inventory List Tooltip Updated (cc4c2334)
  *  LIV-3226 Inventory List Tooltip (b5aa7cd0)
  *  LIV-3226 Inventory List Tooltip (fcc01eb5)
  *  LIV-3382 Temprature Graph updated (42a95514)
  *  LIV-3382 Temprature Graph updated (ab2afb82)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (65606ce7)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (25e2cfc5)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (e896ae4c)
  *  LIV-3372 Input Formate and Validation (a427b10c)
* **alerts:**  alert type fixed in graphql (6978c7cf)
* **log:**  console logs  rmd (dcf04356)
* **actLog:**  rm null value from act logs (6c19a6ff)
* **calls:**  rm unused calls and code tuning (2915ea67)
* **css:**  css updated before the button rendered (23c66290)
* **dashboard:**
  * dashboard graph removed duplicate kiosk filter (124f24e4)
  * LIV-3859 dashboard graph fix (49ddb63c)
* **Dashboard and Organizations:**  LIV-3212 updated magins between the dropdowns (b65e3b64)
* **kiosk screen:** LIV-3844  multiple kiosk selection (3e3dc652)
* **manufacture:**  manufacture filter fixed (8ac9da92)
* **select check boxes component:** optimized loading (d61428f2)
* **transactions products:**  LIV-3207 a minor fix in request payload when none of the kiosks is selected (42e1cd68)
* **factor:**  refactoring code (adeb8691)
* **kiosks:**  update placeholder img styling (eb2d6b3b)
* **Products:**
  *  LIV-3378 Product Form Validation (dad05d30)
  *  LIV-3378 Product Form Validation (a94687e5)
* **kiosks list page:** LIV-3727 multiple selection filter displays after full loading (0a1d07d8)
* **transactions sales:** LIV-2787 widgets show data for multiple kiosks (3bab257e)
* **payment:**  payment status update (1225056f)
* **Kiosk Overview Admin and Super Admin:**  LIV-3371 different Kiosk Overview of Admin and Super Admin (784fa9ab)
* **users, products, kiosks:** LIV-3558 pagination redux actions updated and users search on redux fixed (7a4309d7)
* **users:** LIV-3558 users navigation pagination and search data saved on redux state (d638d7f3)
* **Users:**  LIV-3458 User Low must be highlighted once selected (f80db353)
* **All Margin btw Drop down:**  LIV-3212 Updating Margin tw Dropdowns (aeb21606)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into test-master (b0a394b7)
* //gitlab.com/livello-network/livello-mission-control into test-master (66754493)
* //gitlab.com/livello-network/livello-mission-control into test-master (9c8cbe45)
* //gitlab.com/livello-network/livello-mission-control into staging-master (59d8455d)
* //gitlab.com/livello-network/livello-mission-control into staging-master (111a9c2e)
* //gitlab.com/livello-network/livello-mission-control into LIV-3226 (4c51b673)
* //gitlab.com/livello-network/livello-mission-control into test-master (341aea4a)
* //gitlab.com/livello-network/livello-mission-control into test-master (659a585b)
* //gitlab.com/livello-network/livello-mission-control into test-master (df8722da)
* //gitlab.com/livello-network/livello-mission-control into LIV-3844 (6273158e)
* livello-network/livello-mission-control into test-master (e1b1307f)
*  Temp Decimal fixed): LIV-3382 Temp Log of last 7 dates decimal value fixed (fdf2d0f0)
* LIV-2787 kiosk multiple filtering widget data (302eb58b)
*  Temp): LIV-3382 Temp Log of last 7 dates (669bdaf1)
*  Temp): LIV-3382 Temp Log of last 7 dates (2c6f9b1f)
*  Salex By Fridge Graph): LIV-3571 Sales By Frdidge Graph Overlapping text issue resolved updated (0a2a8fad)

##### Tests

* **k8:**  add yaml files for test env (6e4f3024)

#### 1.4.31 (2021-11-16)

##### New Features

* **transactions:** LIV-3842 Adding changes to set a default date for the current month in the transactions page (a1fd6824)
* **refill:**  LIV-3740 updating transaction refills grid with the refill column (cd501811)
* **product form:** LIV-4043 selector updated as per the input component with... (12a9068c)
* **reports:**
  * [LIV-3295] add Net Sales/Profit/ Net Cost graph (ece8f0c7)
  * LIV-3297 topSellingKiosks integration (32d50ebc)
  * LIV-3790 table component updated for tooltip (8c398e57)
  * LIV-3970 reports table component updated for tooltip (7928fbf4)
  * LIV-3970 reports table component updated (40449600)
  * LIV-3970 reports table component updated (cd78ea9d)
  * LIV-3970 table component css updated (60ffd1ac)
  * LIV-3970 new table component (da302482)
  * LIV-3294 widgets and module cleanup (f65cef90)
  * LIV-3294 reports widget (2840ae43)
  * cleanup module (c4d79d7a)
* **kiosks:** LIV-3986 kiosk serial numbers validation on kiosk creation (f1fad8f6)
* **components:**
  * LIV-3991 custom dropdown component with keyboard events implemented (efc32257)
  * LIV-3991 form dropdown component updated (ccb521ca)
  * LIV-3991 new custom form dropdown component (90353aac)
  * LIV-3991 custom dropdown component (1c3bf1b0)
  * LIV-2787 multi select chck box options - clear button (0cb96893)
  * LIV-2787 outside click handler for multiple selection options (a849d128)
* **reports widget:** LIV-3294 average daily revenue and peak sales hour widgets (967e3f28)
* **nwStatus:**  update temp and heartbeat for nw status (6f6fdb71)
* **dashboard:** LIV-3895 multiple kiosk selection for sales graph (35cff32b)
* **kiosk overview:** LIV-3737 kiosk filter removed (8c7e8dfd)
* **multiple seleciton kiosk:** LIV-3844 optimizaitions (6e807904)
* **products:** LIV-3788 manufacturers multiple selection (583ded4e)
* **LIV-3839:**  added alert for invalid scale readings (07fb3a0c)
* **products listing:** LIV-3788 removed category column from products page (de8734fa)
* **teansactions-products:** LIV-3786 multiple kiosk filter for transaction products (2c186e7d)
* **test:**  added test url for test env (a129bda3)
* **transactions refills:** LIV-3726 multiple kiosk filter and updated widgest and CSV (2c9b415d)
* **alerts page:** LIV-3785 multiple kiosk selection filter (aa22626c)
* **kiosk list page:** LIV-3727 multiple kiosk filtering (43c15424)
* **transaction sales:** LIV-2787 CSV export for sales (4c580c0d)
* **transactions sales:** LIV-2787 CSV (13d99894)
* **ci-cd:**  add test-master deployments (88c3f3c6)
* **transactions-sales:** LIV-2787 multiple kiosk filtering (83295102)
* **Components:** LIV-2787 multiple selection component (ea5f090f)

##### Bug Fixes

* **Kiosks:**  LIV-4045 Show tooltips for new planogram and Add/Update Button Option (172109ae)
* **kiosk:**
  *  LIV-3738: adding changes to make refill type as enum (8f80ff6e)
  *  [LIV-3226] Inventory list fix (7bf607ad)
  *  Resolve LIV-3372 update kiosk form (f3cfbce4)
  *  Resolve LIV-3226 fix inventory table (2301df3b)
  *  Resolve LIV-3382 chart sensor values (b92b2f5d)
  *  LIV-3371 Adding frontend changes for kiosk table sorting based on organization name (f4144409)
* **node:**  adjust base image to 14-alpine als lts switched to node 16 (ba6db126)
* **reports:**
  * reports UI changes according to UX (3a37d3c3)
  * LIV-3297 top selling kiosks fix decimal issue and fix date filter (60458017)
  * LIV-3297 fixing date filters (1d66d1e2)
* **Kiosk Planogram:**  LIV-3502 Applied Validation Add/Edit Scale updated (0e8cf765)
* **components:** LIV-3991 dropdown component issues fixed (8aef4075)
* **kiosk create:** LIV-3986 validate serial numbers on create (bdc8a7d3)
* **LIV-3999:**
  *  fixed kiosk with prod and loader and product to null initially for detail page. (3fd269c1)
  *  fixed kiosk with prod and loader and product to null initially for detail page. (8bd8e475)
* **Temprature Log:**
  *  LIV-3382 Fixed default value and put loader (f37aebb0)
  *  LIV-3921 Fixed Nan for windows browser (a7a59f46)
* **All Tables:**
  *  LIV-3544 Hower Issue in Transactions Tables (a79bafad)
  *  LIV-3544 Fixed Angular Corner and CSS Overlapping Issue (fbea2d52)
  *  LIV-3544 Fixed Angular Corner and CSS Overlapping Issue (f38f6ca6)
* **refils:** LIV-3956 export CSV with date range filter bug fix (1bb3a6ff)
* **Define button Color:**
  *  LIV-3213 Fixed product page edit/add cancel button updated for Organization and products (d2fedfef)
  *  LIV-3213 Fixed product page edit/add cancel button updated (eac7551f)
* **Planogram Hyphenation:**  LIV-3551 Fixed text hyphensation issue in planogram (d8655e0f)
* **All Tables Update Corners:**  LIV-3544 Fixed Angular Corner of All Tables (6a17c4fe)
* **Transaction Products Table:**
  *  LIV-3847 transaction Product table Updated (ab898dcd)
  *  LIV-3847 transaction Product table (18679808)
* **Kiosks, Organizations, Products:**
  *  LIV-3871 Organization Tool bar Position for mobile and web updated config (9e85a27c)
  *  LIV-3871 Organization Tool bar Position for mobile and web updated after merge (83bf238b)
  *  LIV-3871 Organization Tool bar Position for mobile and web updated (a9382d6e)
* **Paginaztion dropdown:**  LIV-3855 Updated dropdowns for mobile (7ae6ce96)
* **product form:**
  * product form EAN fix (f2eaeea5)
  * LIV-3929 product create hot fix (1512dc18)
* **img:**  img graphql call fixed (d4fa1626)
* **membercard:**  show error message for validation (c3fe83f9)
* **multiple kiosks filter:** LIV-3856 mobile view fetch API call fixed (2cb8c139)
* **Organizations:**  LIV-3871 Organization Tool bar Position for mobile and web (6902f9a1)
* **kiosk detail:** LIV-3831 planogram cellId and planogram position change (c93b55c1)
* **cicd:**  update yaml file (e47b6605)
* **LIV-3583:**
  *  updated alert for every imageupload (8196ca6e)
  *  fixed same image uplaod twice (a62aa0bd)
  *  Updated btn design and msg format (47dcfe3a)
  * fixed img base64 and updated alerts name (29da2db5)
* **url:**  updated BE url for staging (55e3fbb1)
* **Kiosk Planogram Edit/Add Scale:**  LIV-3502 Kiosk Overview Add/Edit Scale (f50a8218)
* **modal:**  modal loadcell popup alert fixed (59feb7c6)
* **Users Details:**  LIV-3876 User Details component Position fixed (31480098)
* **kiosk Inventory Table:**
  *  LIV-3226 Inventory Table Sorted Results (6b3b9740)
  *  LIV-3226 Inventory Table Updated (3082f702)
* **modal load cell:**
  * LIV-3849 fixed wrong error message position changed (dec2189b)
  * LIV-3865 delete load cell confirmation dialog change (a07deeba)
* **Kiosk:**
  *  LIV-3382 Temprature Graph time formate updated (ecc6a6a3)
  *  LIV-3382 Temprature Graph time formate (57215ef3)
  *  LIV-3226 Inventory List Tooltip Updated (60ac4066)
  *  LIV-3226 Inventory List Tooltip Updated (cc4c2334)
  *  LIV-3226 Inventory List Tooltip (b5aa7cd0)
  *  LIV-3226 Inventory List Tooltip (fcc01eb5)
  *  LIV-3382 Temprature Graph updated (42a95514)
  *  LIV-3382 Temprature Graph updated (ab2afb82)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (65606ce7)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (25e2cfc5)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (e896ae4c)
  *  LIV-3372 Input Formate and Validation (a427b10c)
* **alerts:**  alert type fixed in graphql (6978c7cf)
* **log:**  console logs  rmd (dcf04356)
* **actLog:**  rm null value from act logs (6c19a6ff)
* **calls:**  rm unused calls and code tuning (2915ea67)
* **css:**  css updated before the button rendered (23c66290)
* **dashboard:**
  * dashboard graph removed duplicate kiosk filter (124f24e4)
  * LIV-3859 dashboard graph fix (49ddb63c)
* **Dashboard and Organizations:**  LIV-3212 updated magins between the dropdowns (b65e3b64)
* **kiosk screen:** LIV-3844  multiple kiosk selection (3e3dc652)
* **manufacture:**  manufacture filter fixed (8ac9da92)
* **select check boxes component:** optimized loading (d61428f2)
* **transactions products:**  LIV-3207 a minor fix in request payload when none of the kiosks is selected (42e1cd68)
* **factor:**  refactoring code (adeb8691)
* **kiosks:**  update placeholder img styling (eb2d6b3b)
* **Products:**
  *  LIV-3378 Product Form Validation (dad05d30)
  *  LIV-3378 Product Form Validation (a94687e5)
* **kiosks list page:** LIV-3727 multiple selection filter displays after full loading (0a1d07d8)
* **transactions sales:** LIV-2787 widgets show data for multiple kiosks (3bab257e)
* **payment:**  payment status update (1225056f)
* **Kiosk Overview Admin and Super Admin:**  LIV-3371 different Kiosk Overview of Admin and Super Admin (784fa9ab)
* **users, products, kiosks:** LIV-3558 pagination redux actions updated and users search on redux fixed (7a4309d7)
* **users:** LIV-3558 users navigation pagination and search data saved on redux state (d638d7f3)
* **Users:**  LIV-3458 User Low must be highlighted once selected (f80db353)
* **All Margin btw Drop down:**  LIV-3212 Updating Margin tw Dropdowns (aeb21606)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into test-master (66754493)
* //gitlab.com/livello-network/livello-mission-control into test-master (9c8cbe45)
* //gitlab.com/livello-network/livello-mission-control into staging-master (59d8455d)
* //gitlab.com/livello-network/livello-mission-control into staging-master (111a9c2e)
* //gitlab.com/livello-network/livello-mission-control into LIV-3226 (4c51b673)
* //gitlab.com/livello-network/livello-mission-control into test-master (341aea4a)
* //gitlab.com/livello-network/livello-mission-control into test-master (659a585b)
* //gitlab.com/livello-network/livello-mission-control into test-master (df8722da)
* //gitlab.com/livello-network/livello-mission-control into LIV-3844 (6273158e)
* livello-network/livello-mission-control into test-master (e1b1307f)
*  Temp Decimal fixed): LIV-3382 Temp Log of last 7 dates decimal value fixed (fdf2d0f0)
* LIV-2787 kiosk multiple filtering widget data (302eb58b)
*  Temp): LIV-3382 Temp Log of last 7 dates (669bdaf1)
*  Temp): LIV-3382 Temp Log of last 7 dates (2c6f9b1f)
*  Salex By Fridge Graph): LIV-3571 Sales By Frdidge Graph Overlapping text issue resolved updated (0a2a8fad)

##### Tests

* **k8:**  add yaml files for test env (6e4f3024)

#### 1.4.30 (2021-11-03)

##### New Features

* **refill:**  LIV-3740 updating transaction refills grid with the refill column (a36a2c2e)
* **reports:**
  * [LIV-3295] add Net Sales/Profit/ Net Cost graph (ece8f0c7)
  * LIV-3297 topSellingKiosks integration (32d50ebc)
  * LIV-3790 table component updated for tooltip (8c398e57)
  * LIV-3970 reports table component updated for tooltip (7928fbf4)
  * LIV-3970 reports table component updated (40449600)
  * LIV-3970 reports table component updated (cd78ea9d)
  * LIV-3970 table component css updated (60ffd1ac)
  * LIV-3970 new table component (da302482)
  * LIV-3294 widgets and module cleanup (f65cef90)
  * LIV-3294 reports widget (2840ae43)
  * cleanup module (c4d79d7a)
* **kiosks:** LIV-3986 kiosk serial numbers validation on kiosk creation (f1fad8f6)
* **components:**
  * LIV-3991 custom dropdown component with keyboard events implemented (efc32257)
  * LIV-3991 form dropdown component updated (ccb521ca)
  * LIV-3991 new custom form dropdown component (90353aac)
  * LIV-3991 custom dropdown component (1c3bf1b0)
  * LIV-2787 multi select chck box options - clear button (0cb96893)
  * LIV-2787 outside click handler for multiple selection options (a849d128)
* **reports widget:** LIV-3294 average daily revenue and peak sales hour widgets (967e3f28)
* **nwStatus:**  update temp and heartbeat for nw status (6f6fdb71)
* **dashboard:** LIV-3895 multiple kiosk selection for sales graph (35cff32b)
* **kiosk overview:** LIV-3737 kiosk filter removed (8c7e8dfd)
* **transaction refills:**  adding related changes in frontend to differentitate refills between automatic vs manual (43b015d0)
* **multiple seleciton kiosk:** LIV-3844 optimizaitions (6e807904)
* **products:** LIV-3788 manufacturers multiple selection (583ded4e)
* **LIV-3839:**  added alert for invalid scale readings (07fb3a0c)
* **products listing:** LIV-3788 removed category column from products page (de8734fa)
* **teansactions-products:** LIV-3786 multiple kiosk filter for transaction products (2c186e7d)
* **test:**  added test url for test env (a129bda3)
* **transactions refills:** LIV-3726 multiple kiosk filter and updated widgest and CSV (2c9b415d)
* **alerts page:** LIV-3785 multiple kiosk selection filter (aa22626c)
* **kiosk list page:** LIV-3727 multiple kiosk filtering (43c15424)
* **transaction sales:** LIV-2787 CSV export for sales (4c580c0d)
* **transactions sales:** LIV-2787 CSV (13d99894)
* **ci-cd:**  add test-master deployments (88c3f3c6)
* **transactions-sales:** LIV-2787 multiple kiosk filtering (83295102)
* **Components:** LIV-2787 multiple selection component (ea5f090f)

##### Bug Fixes

* **node:**  adjust base image to 14-alpine als lts switched to node 16 (ba6db126)
* **reports:**
  * reports UI changes according to UX (3a37d3c3)
  * LIV-3297 top selling kiosks fix decimal issue and fix date filter (60458017)
  * LIV-3297 fixing date filters (1d66d1e2)
* **Kiosk Planogram:**  LIV-3502 Applied Validation Add/Edit Scale updated (0e8cf765)
* **components:** LIV-3991 dropdown component issues fixed (8aef4075)
* **kiosk create:** LIV-3986 validate serial numbers on create (bdc8a7d3)
* **LIV-3999:**
  *  fixed kiosk with prod and loader and product to null initially for detail page. (3fd269c1)
  *  fixed kiosk with prod and loader and product to null initially for detail page. (8bd8e475)
* **Temprature Log:**
  *  LIV-3382 Fixed default value and put loader (f37aebb0)
  *  LIV-3921 Fixed Nan for windows browser (a7a59f46)
* **All Tables:**
  *  LIV-3544 Hower Issue in Transactions Tables (a79bafad)
  *  LIV-3544 Fixed Angular Corner and CSS Overlapping Issue (fbea2d52)
  *  LIV-3544 Fixed Angular Corner and CSS Overlapping Issue (f38f6ca6)
* **refils:** LIV-3956 export CSV with date range filter bug fix (1bb3a6ff)
* **Define button Color:**
  *  LIV-3213 Fixed product page edit/add cancel button updated for Organization and products (d2fedfef)
  *  LIV-3213 Fixed product page edit/add cancel button updated (eac7551f)
* **Planogram Hyphenation:**  LIV-3551 Fixed text hyphensation issue in planogram (d8655e0f)
* **All Tables Update Corners:**  LIV-3544 Fixed Angular Corner of All Tables (6a17c4fe)
* **Transaction Products Table:**
  *  LIV-3847 transaction Product table Updated (ab898dcd)
  *  LIV-3847 transaction Product table (18679808)
* **Kiosks, Organizations, Products:**
  *  LIV-3871 Organization Tool bar Position for mobile and web updated config (9e85a27c)
  *  LIV-3871 Organization Tool bar Position for mobile and web updated after merge (83bf238b)
  *  LIV-3871 Organization Tool bar Position for mobile and web updated (a9382d6e)
* **Paginaztion dropdown:**  LIV-3855 Updated dropdowns for mobile (7ae6ce96)
* **product form:**
  * product form EAN fix (f2eaeea5)
  * LIV-3929 product create hot fix (1512dc18)
* **img:**  img graphql call fixed (d4fa1626)
* **membercard:**  show error message for validation (c3fe83f9)
* **multiple kiosks filter:** LIV-3856 mobile view fetch API call fixed (2cb8c139)
* **Organizations:**  LIV-3871 Organization Tool bar Position for mobile and web (6902f9a1)
* **kiosk detail:** LIV-3831 planogram cellId and planogram position change (c93b55c1)
* **cicd:**  update yaml file (e47b6605)
* **LIV-3583:**
  *  updated alert for every imageupload (8196ca6e)
  *  fixed same image uplaod twice (a62aa0bd)
  *  Updated btn design and msg format (47dcfe3a)
  * fixed img base64 and updated alerts name (29da2db5)
* **url:**  updated BE url for staging (55e3fbb1)
* **Kiosk Planogram Edit/Add Scale:**  LIV-3502 Kiosk Overview Add/Edit Scale (f50a8218)
* **modal:**  modal loadcell popup alert fixed (59feb7c6)
* **Users Details:**  LIV-3876 User Details component Position fixed (31480098)
* **kiosk Inventory Table:**
  *  LIV-3226 Inventory Table Sorted Results (6b3b9740)
  *  LIV-3226 Inventory Table Updated (3082f702)
* **modal load cell:**
  * LIV-3849 fixed wrong error message position changed (dec2189b)
  * LIV-3865 delete load cell confirmation dialog change (a07deeba)
* **Kiosk:**
  *  LIV-3382 Temprature Graph time formate updated (ecc6a6a3)
  *  LIV-3382 Temprature Graph time formate (57215ef3)
  *  LIV-3226 Inventory List Tooltip Updated (60ac4066)
  *  LIV-3226 Inventory List Tooltip Updated (cc4c2334)
  *  LIV-3226 Inventory List Tooltip (b5aa7cd0)
  *  LIV-3226 Inventory List Tooltip (fcc01eb5)
  *  LIV-3382 Temprature Graph updated (42a95514)
  *  LIV-3382 Temprature Graph updated (ab2afb82)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (65606ce7)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (25e2cfc5)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (e896ae4c)
  *  LIV-3372 Input Formate and Validation (a427b10c)
* **alerts:**  alert type fixed in graphql (6978c7cf)
* **log:**  console logs  rmd (dcf04356)
* **kiosk:**
  *  [LIV-3226] Inventory list fix (7bf607ad)
  *  Resolve LIV-3372 update kiosk form (f3cfbce4)
  *  Resolve LIV-3226 fix inventory table (2301df3b)
  *  Resolve LIV-3382 chart sensor values (b92b2f5d)
  *  LIV-3371 Adding frontend changes for kiosk table sorting based on organization name (f4144409)
* **actLog:**  rm null value from act logs (6c19a6ff)
* **calls:**  rm unused calls and code tuning (2915ea67)
* **css:**  css updated before the button rendered (23c66290)
* **dashboard:**
  * dashboard graph removed duplicate kiosk filter (124f24e4)
  * LIV-3859 dashboard graph fix (49ddb63c)
* **Dashboard and Organizations:**  LIV-3212 updated magins between the dropdowns (b65e3b64)
* **kiosk screen:** LIV-3844  multiple kiosk selection (3e3dc652)
* **manufacture:**  manufacture filter fixed (8ac9da92)
* **select check boxes component:** optimized loading (d61428f2)
* **transactions products:**  LIV-3207 a minor fix in request payload when none of the kiosks is selected (42e1cd68)
* **factor:**  refactoring code (adeb8691)
* **kiosks:**  update placeholder img styling (eb2d6b3b)
* **Products:**
  *  LIV-3378 Product Form Validation (dad05d30)
  *  LIV-3378 Product Form Validation (a94687e5)
* **kiosks list page:** LIV-3727 multiple selection filter displays after full loading (0a1d07d8)
* **transactions sales:** LIV-2787 widgets show data for multiple kiosks (3bab257e)
* **payment:**  payment status update (1225056f)
* **Kiosk Overview Admin and Super Admin:**  LIV-3371 different Kiosk Overview of Admin and Super Admin (784fa9ab)
* **users, products, kiosks:** LIV-3558 pagination redux actions updated and users search on redux fixed (7a4309d7)
* **users:** LIV-3558 users navigation pagination and search data saved on redux state (d638d7f3)
* **Users:**  LIV-3458 User Low must be highlighted once selected (f80db353)
* **All Margin btw Drop down:**  LIV-3212 Updating Margin tw Dropdowns (aeb21606)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into feat/diffRefills (863fd97b)
* //gitlab.com/livello-network/livello-mission-control into test-master (66754493)
* //gitlab.com/livello-network/livello-mission-control into test-master (9c8cbe45)
* //gitlab.com/livello-network/livello-mission-control into staging-master (59d8455d)
* //gitlab.com/livello-network/livello-mission-control into staging-master (111a9c2e)
* //gitlab.com/livello-network/livello-mission-control into LIV-3226 (4c51b673)
* //gitlab.com/livello-network/livello-mission-control into test-master (341aea4a)
* //gitlab.com/livello-network/livello-mission-control into test-master (659a585b)
* //gitlab.com/livello-network/livello-mission-control into test-master (df8722da)
* //gitlab.com/livello-network/livello-mission-control into LIV-3844 (6273158e)
* livello-network/livello-mission-control into test-master (e1b1307f)
*  Temp Decimal fixed): LIV-3382 Temp Log of last 7 dates decimal value fixed (fdf2d0f0)
* LIV-2787 kiosk multiple filtering widget data (302eb58b)
*  Temp): LIV-3382 Temp Log of last 7 dates (669bdaf1)
*  Temp): LIV-3382 Temp Log of last 7 dates (2c6f9b1f)
*  Salex By Fridge Graph): LIV-3571 Sales By Frdidge Graph Overlapping text issue resolved updated (0a2a8fad)

##### Tests

* **k8:**  add yaml files for test env (6e4f3024)

#### 1.4.29 (2021-10-29)

##### New Features

* **reports:**
  * [LIV-3295] add Net Sales/Profit/ Net Cost graph (ece8f0c7)
  * LIV-3297 topSellingKiosks integration (32d50ebc)
  * LIV-3790 table component updated for tooltip (8c398e57)
  * LIV-3970 reports table component updated for tooltip (7928fbf4)
  * LIV-3970 reports table component updated (40449600)
  * LIV-3970 reports table component updated (cd78ea9d)
  * LIV-3970 table component css updated (60ffd1ac)
  * LIV-3970 new table component (da302482)
  * LIV-3294 widgets and module cleanup (f65cef90)
  * LIV-3294 reports widget (2840ae43)
  * cleanup module (c4d79d7a)
* **kiosks:** LIV-3986 kiosk serial numbers validation on kiosk creation (f1fad8f6)
* **components:**
  * LIV-3991 custom dropdown component with keyboard events implemented (efc32257)
  * LIV-3991 form dropdown component updated (ccb521ca)
  * LIV-3991 new custom form dropdown component (90353aac)
  * LIV-3991 custom dropdown component (1c3bf1b0)
* **reports widget:** LIV-3294 average daily revenue and peak sales hour widgets (967e3f28)
* **nwStatus:**  update temp and heartbeat for nw status (6f6fdb71)
* **dashboard:** LIV-3895 multiple kiosk selection for sales graph (35cff32b)
* **kiosk overview:** LIV-3737 kiosk filter removed (8c7e8dfd)
* **multiple seleciton kiosk:** LIV-3844 optimizaitions (6e807904)
* **products:** LIV-3788 manufacturers multiple selection (583ded4e)
* **LIV-3839:**  added alert for invalid scale readings (07fb3a0c)
* **products listing:** LIV-3788 removed category column from products page (de8734fa)
* **test:**  added test url for test env (a129bda3)
* **ci-cd:**  add test-master deployments (88c3f3c6)

##### Bug Fixes

* **reports:**
  * reports UI changes according to UX (3a37d3c3)
  * LIV-3297 top selling kiosks fix decimal issue and fix date filter (60458017)
  * LIV-3297 fixing date filters (1d66d1e2)
* **Kiosk Planogram:**  LIV-3502 Applied Validation Add/Edit Scale updated (0e8cf765)
* **components:** LIV-3991 dropdown component issues fixed (8aef4075)
* **kiosk create:** LIV-3986 validate serial numbers on create (bdc8a7d3)
* **LIV-3999:**  fixed kiosk with prod and loader and product to null initially for detail page. (8bd8e475)
* **Temprature Log:**
  *  LIV-3382 Fixed default value and put loader (f37aebb0)
  *  LIV-3921 Fixed Nan for windows browser (a7a59f46)
* **All Tables:**
  *  LIV-3544 Hower Issue in Transactions Tables (a79bafad)
  *  LIV-3544 Fixed Angular Corner and CSS Overlapping Issue (fbea2d52)
  *  LIV-3544 Fixed Angular Corner and CSS Overlapping Issue (f38f6ca6)
* **refils:** LIV-3956 export CSV with date range filter bug fix (1bb3a6ff)
* **Define button Color:**
  *  LIV-3213 Fixed product page edit/add cancel button updated for Organization and products (d2fedfef)
  *  LIV-3213 Fixed product page edit/add cancel button updated (eac7551f)
* **Planogram Hyphenation:**  LIV-3551 Fixed text hyphensation issue in planogram (d8655e0f)
* **All Tables Update Corners:**  LIV-3544 Fixed Angular Corner of All Tables (6a17c4fe)
* **Transaction Products Table:**
  *  LIV-3847 transaction Product table Updated (ab898dcd)
  *  LIV-3847 transaction Product table (18679808)
* **Kiosks, Organizations, Products:**
  *  LIV-3871 Organization Tool bar Position for mobile and web updated config (9e85a27c)
  *  LIV-3871 Organization Tool bar Position for mobile and web updated after merge (83bf238b)
  *  LIV-3871 Organization Tool bar Position for mobile and web updated (a9382d6e)
* **Paginaztion dropdown:**  LIV-3855 Updated dropdowns for mobile (7ae6ce96)
* **product form:**
  * product form EAN fix (f2eaeea5)
  * LIV-3929 product create hot fix (1512dc18)
* **img:**  img graphql call fixed (d4fa1626)
* **membercard:**  show error message for validation (c3fe83f9)
* **multiple kiosks filter:** LIV-3856 mobile view fetch API call fixed (2cb8c139)
* **Organizations:**  LIV-3871 Organization Tool bar Position for mobile and web (6902f9a1)
* **kiosk detail:** LIV-3831 planogram cellId and planogram position change (c93b55c1)
* **cicd:**  update yaml file (e47b6605)
* **LIV-3583:**
  *  updated alert for every imageupload (8196ca6e)
  *  fixed same image uplaod twice (a62aa0bd)
* **url:**  updated BE url for staging (55e3fbb1)
* **Kiosk Planogram Edit/Add Scale:**  LIV-3502 Kiosk Overview Add/Edit Scale (f50a8218)
* **modal:**  modal loadcell popup alert fixed (59feb7c6)
* **Users Details:**  LIV-3876 User Details component Position fixed (31480098)
* **kiosk Inventory Table:**
  *  LIV-3226 Inventory Table Sorted Results (6b3b9740)
  *  LIV-3226 Inventory Table Updated (3082f702)
* **modal load cell:**
  * LIV-3849 fixed wrong error message position changed (dec2189b)
  * LIV-3865 delete load cell confirmation dialog change (a07deeba)
* **Kiosk:**
  *  LIV-3382 Temprature Graph time formate updated (ecc6a6a3)
  *  LIV-3382 Temprature Graph time formate (57215ef3)
  *  LIV-3226 Inventory List Tooltip Updated (60ac4066)
  *  LIV-3226 Inventory List Tooltip Updated (cc4c2334)
  *  LIV-3226 Inventory List Tooltip (b5aa7cd0)
  *  LIV-3226 Inventory List Tooltip (fcc01eb5)
  *  LIV-3382 Temprature Graph updated (42a95514)
  *  LIV-3382 Temprature Graph updated (ab2afb82)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (65606ce7)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (25e2cfc5)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (e896ae4c)
  *  LIV-3372 Input Formate and Validation (a427b10c)
* **alerts:**  alert type fixed in graphql (6978c7cf)
* **log:**  console logs  rmd (dcf04356)
* **kiosk:**
  *  [LIV-3226] Inventory list fix (7bf607ad)
  *  Resolve LIV-3372 update kiosk form (f3cfbce4)
  *  Resolve LIV-3226 fix inventory table (2301df3b)
  *  Resolve LIV-3382 chart sensor values (b92b2f5d)
* **actLog:**  rm null value from act logs (6c19a6ff)
* **calls:**  rm unused calls and code tuning (2915ea67)
* **css:**  css updated before the button rendered (23c66290)
* **dashboard:**
  * dashboard graph removed duplicate kiosk filter (124f24e4)
  * LIV-3859 dashboard graph fix (49ddb63c)
* **Dashboard and Organizations:**  LIV-3212 updated magins between the dropdowns (b65e3b64)
* **kiosk screen:** LIV-3844  multiple kiosk selection (3e3dc652)
* **manufacture:**  manufacture filter fixed (8ac9da92)
* **select check boxes component:** optimized loading (d61428f2)
* **transactions products:**  LIV-3207 a minor fix in request payload when none of the kiosks is selected (42e1cd68)
* **factor:**  refactoring code (adeb8691)
* **kiosks:**  update placeholder img styling (eb2d6b3b)
* **Products:**
  *  LIV-3378 Product Form Validation (dad05d30)
  *  LIV-3378 Product Form Validation (a94687e5)
* **All Margin btw Drop down:**  LIV-3212 Updating Margin tw Dropdowns (aeb21606)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into test-master (66754493)
* //gitlab.com/livello-network/livello-mission-control into test-master (9c8cbe45)
* //gitlab.com/livello-network/livello-mission-control into staging-master (59d8455d)
* //gitlab.com/livello-network/livello-mission-control into staging-master (111a9c2e)
* //gitlab.com/livello-network/livello-mission-control into LIV-3226 (4c51b673)
* //gitlab.com/livello-network/livello-mission-control into test-master (341aea4a)
* //gitlab.com/livello-network/livello-mission-control into test-master (659a585b)
* //gitlab.com/livello-network/livello-mission-control into test-master (df8722da)
* //gitlab.com/livello-network/livello-mission-control into LIV-3844 (6273158e)
* livello-network/livello-mission-control into test-master (e1b1307f)

##### Tests

* **k8:**  add yaml files for test env (6e4f3024)

#### 1.4.28 (2021-09-29)

##### New Features

* **nwStatus:**  update temp and heartbeat for nw status (6f6fdb71)
* **dashboard:** LIV-3895 multiple kiosk selection for sales graph (35cff32b)
* **kiosk overview:** LIV-3737 kiosk filter removed (8c7e8dfd)
* **multiple seleciton kiosk:** LIV-3844 optimizaitions (6e807904)
* **products:** LIV-3788 manufacturers multiple selection (583ded4e)
* **LIV-3839:**  added alert for invalid scale readings (07fb3a0c)
* **products listing:** LIV-3788 removed category column from products page (de8734fa)
* **test:**  added test url for test env (a129bda3)
* **ci-cd:**  add test-master deployments (88c3f3c6)

##### Bug Fixes

* **membercard:**  show error message for validation (c3fe83f9)
* **cicd:**  update yaml file (e47b6605)
* **LIV-3583:**
  *  updated alert for every imageupload (8196ca6e)
  *  fixed same image uplaod twice (a62aa0bd)
* **url:**  updated BE url for staging (55e3fbb1)
* **Kiosk Planogram Edit/Add Scale:**  LIV-3502 Kiosk Overview Add/Edit Scale (f50a8218)
* **modal:**  modal loadcell popup alert fixed (59feb7c6)
* **Transaction Products Table:**  LIV-3847 transaction Product table (18679808)
* **Users Details:**  LIV-3876 User Details component Position fixed (31480098)
* **kiosk Inventory Table:**
  *  LIV-3226 Inventory Table Sorted Results (6b3b9740)
  *  LIV-3226 Inventory Table Updated (3082f702)
* **modal load cell:**
  * LIV-3849 fixed wrong error message position changed (dec2189b)
  * LIV-3865 delete load cell confirmation dialog change (a07deeba)
* **Kiosk:**
  *  LIV-3382 Temprature Graph time formate updated (ecc6a6a3)
  *  LIV-3382 Temprature Graph time formate (57215ef3)
  *  LIV-3226 Inventory List Tooltip Updated (60ac4066)
  *  LIV-3226 Inventory List Tooltip Updated (cc4c2334)
  *  LIV-3226 Inventory List Tooltip (b5aa7cd0)
  *  LIV-3226 Inventory List Tooltip (fcc01eb5)
  *  LIV-3382 Temprature Graph updated (42a95514)
  *  LIV-3382 Temprature Graph updated (ab2afb82)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (65606ce7)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (25e2cfc5)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (e896ae4c)
  *  LIV-3372 Input Formate and Validation (a427b10c)
* **alerts:**  alert type fixed in graphql (6978c7cf)
* **log:**  console logs  rmd (dcf04356)
* **kiosk:**
  *  [LIV-3226] Inventory list fix (7bf607ad)
  *  Resolve LIV-3372 update kiosk form (f3cfbce4)
  *  Resolve LIV-3226 fix inventory table (2301df3b)
  *  Resolve LIV-3382 chart sensor values (b92b2f5d)
* **actLog:**  rm null value from act logs (6c19a6ff)
* **calls:**  rm unused calls and code tuning (2915ea67)
* **css:**  css updated before the button rendered (23c66290)
* **dashboard:**
  * dashboard graph removed duplicate kiosk filter (124f24e4)
  * LIV-3859 dashboard graph fix (49ddb63c)
* **Dashboard and Organizations:**  LIV-3212 updated magins between the dropdowns (b65e3b64)
* **kiosk screen:** LIV-3844  multiple kiosk selection (3e3dc652)
* **manufacture:**  manufacture filter fixed (8ac9da92)
* **select check boxes component:** optimized loading (d61428f2)
* **transactions products:**  LIV-3207 a minor fix in request payload when none of the kiosks is selected (42e1cd68)
* **factor:**  refactoring code (adeb8691)
* **kiosks:**  update placeholder img styling (eb2d6b3b)
* **Products:**
  *  LIV-3378 Product Form Validation (dad05d30)
  *  LIV-3378 Product Form Validation (a94687e5)
* **All Margin btw Drop down:**  LIV-3212 Updating Margin tw Dropdowns (aeb21606)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into staging-master (59d8455d)
* //gitlab.com/livello-network/livello-mission-control into staging-master (111a9c2e)
* //gitlab.com/livello-network/livello-mission-control into LIV-3226 (4c51b673)
* //gitlab.com/livello-network/livello-mission-control into test-master (341aea4a)
* //gitlab.com/livello-network/livello-mission-control into test-master (659a585b)
* //gitlab.com/livello-network/livello-mission-control into test-master (df8722da)
* //gitlab.com/livello-network/livello-mission-control into LIV-3844 (6273158e)
* livello-network/livello-mission-control into test-master (e1b1307f)

##### Tests

* **k8:**  add yaml files for test env (6e4f3024)

#### 1.4.28 (2021-09-15)

##### New Features

* **LIV-3839:**  added alert for invalid scale readings (07fb3a0c)
* **products listing:** LIV-3788 removed category column from products page (de8734fa)
* **teansactions-products:** LIV-3786 multiple kiosk filter for transaction products (2c186e7d)
* **test:**  added test url for test env (a129bda3)
* **transactions refills:** LIV-3726 multiple kiosk filter and updated widgest and CSV (2c9b415d)
* **alerts page:** LIV-3785 multiple kiosk selection filter (aa22626c)
* **kiosk list page:** LIV-3727 multiple kiosk filtering (43c15424)
* **transaction sales:** LIV-2787 CSV export for sales (4c580c0d)
* **transactions sales:** LIV-2787 CSV (13d99894)
* **ci-cd:**  add test-master deployments (88c3f3c6)
* **transactions-sales:** LIV-2787 multiple kiosk filtering (83295102)
* **components:**
  * LIV-2787 multi select chck box options - clear button (0cb96893)
  * LIV-2787 outside click handler for multiple selection options (a849d128)
* **Components:** LIV-2787 multiple selection component (ea5f090f)

##### Bug Fixes

* **transactions products:**  LIV-3207 a minor fix in request payload when none of the kiosks is selected (42e1cd68)
* **factor:**  refactoring code (adeb8691)
* **Kiosk:**
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (65606ce7)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (25e2cfc5)
  *  LIV-3371 Kiok Page for Admin and Super Admin Updated (e896ae4c)
  *  LIV-3372 Input Formate and Validation (a427b10c)
* **LIV-3583:**
  *  fixed same image uplaod twice (a62aa0bd)
  *  Updated btn design and msg format (47dcfe3a)
  * fixed img base64 and updated alerts name (29da2db5)
* **kiosks:**  update placeholder img styling (eb2d6b3b)
* **Products:**
  *  LIV-3378 Product Form Validation (dad05d30)
  *  LIV-3378 Product Form Validation (a94687e5)
* **kiosks list page:** LIV-3727 multiple selection filter displays after full loading (0a1d07d8)
* **transactions sales:** LIV-2787 widgets show data for multiple kiosks (3bab257e)
* **payment:**  payment status update (1225056f)
* **Kiosk Overview Admin and Super Admin:**  LIV-3371 different Kiosk Overview of Admin and Super Admin (784fa9ab)
* **kiosk:**  LIV-3371 Adding frontend changes for kiosk table sorting based on organization name (f4144409)
* **users, products, kiosks:** LIV-3558 pagination redux actions updated and users search on redux fixed (7a4309d7)
* **users:** LIV-3558 users navigation pagination and search data saved on redux state (d638d7f3)
* **Users:**  LIV-3458 User Low must be highlighted once selected (f80db353)

##### Other Changes

* livello-network/livello-mission-control into test-master (e1b1307f)
*  Temp Decimal fixed): LIV-3382 Temp Log of last 7 dates decimal value fixed (fdf2d0f0)
* LIV-2787 kiosk multiple filtering widget data (302eb58b)
*  Temp): LIV-3382 Temp Log of last 7 dates (669bdaf1)
*  Temp): LIV-3382 Temp Log of last 7 dates (2c6f9b1f)
*  Salex By Fridge Graph): LIV-3571 Sales By Frdidge Graph Overlapping text issue resolved updated (0a2a8fad)

##### Tests

* **k8:**  add yaml files for test env (6e4f3024)

#### 1.4.27 (2021-09-09)

##### New Features

* **teansactions-products:** LIV-3786 multiple kiosk filter for transaction products (2c186e7d)
* **transactions refills:** LIV-3726 multiple kiosk filter and updated widgest and CSV (2c9b415d)
* **alerts page:** LIV-3785 multiple kiosk selection filter (aa22626c)
* **kiosk list page:** LIV-3727 multiple kiosk filtering (43c15424)
* **transaction sales:** LIV-2787 CSV export for sales (4c580c0d)
* **transactions sales:** LIV-2787 CSV (13d99894)
* **transactions-sales:** LIV-2787 multiple kiosk filtering (83295102)
* **components:**
  * LIV-2787 multi select chck box options - clear button (0cb96893)
  * LIV-2787 outside click handler for multiple selection options (a849d128)
* **Components:** LIV-2787 multiple selection component (ea5f090f)

##### Bug Fixes

* **LIV-3583:**
  *  Updated btn design and msg format (47dcfe3a)
  * fixed img base64 and updated alerts name (29da2db5)
* **kiosks list page:** LIV-3727 multiple selection filter displays after full loading (0a1d07d8)
* **transactions sales:** LIV-2787 widgets show data for multiple kiosks (3bab257e)
* **payment:**  payment status update (1225056f)
* **Kiosk Overview Admin and Super Admin:**  LIV-3371 different Kiosk Overview of Admin and Super Admin (784fa9ab)
* **kiosk:**  LIV-3371 Adding frontend changes for kiosk table sorting based on organization name (f4144409)
* **users, products, kiosks:** LIV-3558 pagination redux actions updated and users search on redux fixed (7a4309d7)
* **users:** LIV-3558 users navigation pagination and search data saved on redux state (d638d7f3)
* **Users:**  LIV-3458 User Low must be highlighted once selected (f80db353)

##### Other Changes

*  Temp Decimal fixed): LIV-3382 Temp Log of last 7 dates decimal value fixed (fdf2d0f0)
* LIV-2787 kiosk multiple filtering widget data (302eb58b)
*  Temp): LIV-3382 Temp Log of last 7 dates (669bdaf1)
*  Temp): LIV-3382 Temp Log of last 7 dates (2c6f9b1f)
*  Salex By Fridge Graph): LIV-3571 Sales By Frdidge Graph Overlapping text issue resolved updated (0a2a8fad)

#### 1.4.27 (2021-08-23)

##### Bug Fixes

* **kiosk:**  Adding frontend changes for kiosk table sorting based on orgainzation name (af5c8334)

#### 1.4.26 (2021-08-18)

##### Bug Fixes

* **kiosks:** LIV-3558 navigation and pagination data saved to redux state (5afcda25)
* **products:** LIV-3558 pagination state moved to redux (9fe44dc7)

#### 1.4.25 (2021-08-13)

##### New Features

* **log:**  activity log update and heartbeat time update (7e30b001)

##### Bug Fixes

* **kiosk planogram:** LIV-3675 removed usage of isActive flag (52916aa8)
* **log:**  activity logs update (b5abf2c0)
* **create product:**  hot fix create product image type bug (a55d7657)

##### Other Changes

* **dashboard:** sales graph is hidden due to accesscontrol bug" (2d0f00a6)

#### 1.4.24 (2021-08-13)

##### New Features

* **product detail:**
  * LIV-3605 list prouct used kiosks and navigation links to corresponding kiosks and loadcells (af58ec5c)
  * LIV-3605 kiosks with product widget (5875dde8)
* **LIV-3601:**  Redirect to Login page after the popup appears (52103819)

##### Bug Fixes

* **Dashbaard, Kiosk, Transactions Table Header:**  LIV-3544 All tables Angular Cornor removed (735cff7f)
* **kiosk Overview Dropdowns Removel:**  LIV-3572 Removed Door Status Removel and Updated Column of Address (5d1f25da)
* **kiosk planogram:** LIV-3537 product price change (to default) on planogram bug fix (a878eb48)
* **kioskCreate:**  Fixed saga call and rm org name (e7b50956)
* **products selectors:** sortByText import fixed (fae0b6ed)
* **size:**  image type and size validation (3c61786a)
* **loader:**  product form loader (d657bb45)
* **LIV-3583:**  Image upload and delete is fixed (679a4a58)
* **products overview:** LIV-3542 product search using manufacturer (c4a30cd9)

##### Other Changes

* Activity Log): LIV-3592 Activity Log Date should be vertically Top (856b9fc4)
*  Salex By Fridge Graph): LIV-3571 Sales By Frdidge Graph Overlapping text issue resolved (014393e3)
* //gitlab.com/livello-network/livello-mission-control into staging-master (10898789)

#### 1.4.23 (2021-08-05)

##### Bug Fixes

* **products overview:** LIV-3542 grid - supplier name renamed to manufacturer (04678bae)

#### 1.4.22 (2021-08-05)

##### New Features

* **mqtt:**  tablet mqtt disconnected alert (84220364)
* **stripe:**  stripe payment link updated (5f8f074d)
* **LIV-3568:**  Update the session type in kiosk details page (dccf656f)
* **LIV-3560:**  Updated heartbeat msg to give acurate Nw status (79620afc)
* **LIV-3556:**  Alert for scales are not working after purchase session (08ea6c1f)
* **LIV-3550:**  Alert is triggered when there is an empty purchase session (49f8e047)
* **LIV-3538:**  update txn payment type on sales table (d23db17c)
* **log:**  activity log update (a155fe22)

##### Bug Fixes

* **products overview:** LIV-3542 suppliers - renamed to manufacturers and manufacturers drop down fixed (7fb252d7)
* **status:**
  *  session status name changed (0b8bb92b)
  *  Nw status dif update in minutes (07ca0228)
* **Kiosk Overview:**  LIV-3371: Added Organization Column with Organizations DropDown (46baaba8)
* **alert:**  alert message changed (72bac3e7)
* **kiosk details Format of number + Currency:**
  *  LIV-3498 Planogram (c615921f)
  *  LIV-3497 Invetory Table Formate changed (8cd8abcb)
* **log:**  log and stripe url update (b620936b)
* **kiosk details Temprature:**  LIV-3382 Temprature Graph Updated and Table Removed (9e7c757c)
* **create product:** hotfix creating product image type bug (b71be1bd)

##### Other Changes

*  Temprature Log): LIV-3382: Updated Temprature Log (d91a89e1)
*  Products): LIV-3545 Widget ToolTip Updated with respect to character width (90ad6dcc)
*  Sales By Fridge ): LIV-3532 Dashboard Chart for Mobile Enable Again (5bdd33d7)
*  Edit/Add Screen): LIV-3509 Change the euro Sign to right side (e804d6e8)
*  Planogram Overlapping Image and text): LIV-3496 Kiosk Details Planogram Overlapping Image (c3eded9c)
* //gitlab.com/livello-network/livello-mission-control into staging-master (2298380d)
* **status:**
  *  changed status to pending in sales table (befc64fa)
  *  update payment type and status in sales table (67f32c05)
* **alert:**  alert msg updated (ef72e906)

#### 1.4.21 (2021-07-21)

##### New Features

* **product detail:** LIV-3434 duplicate product line (09230d6a)

#### 1.4.20 (2021-07-21)

##### New Features

* **delete product:** LIV-3433 delete product line (d1a8108b)
* **LIV-3504:**  alert type is remvd in logs (9a9d9617)

##### Bug Fixes

* **Transaction Sales:**  LIV-2845 Removing transaction id from Transaction Sales page (5ce7ef26)
* **LIV-3504:**  activity log updated for prod taken array (3c0768a1)
* **LIV-3336:**  settings button is enabled for all kiosks (8d7b6a7c)
* **QRcode:**  Qrcode link updated on download (924ec1dc)
* **kiosk edit:** LIV-3424 hotfix - kiosk does not show capacities after editing the kiosk (70d71e1b)
* **kiosk detail:** LIV-3416 kiosk detail with capacities after deleting loadcell (22113ab7)
* **Kiosk detail:** LIV-3410 inventory maximum capacity calculation hotfix (06f22198)

##### Other Changes

* **dashboard:**
  * sales graph is hidden due to accesscontrol bug" (f44ff436)
  * sales graph is hidden due to accesscontrol bug (7b4f6b11)

#### 1.4.19 (2021-07-21)

##### New Features

* **LIV-3504:**  alert type is remvd in logs (9a9d9617)

##### Bug Fixes

* **Transaction Sales:**  LIV-2845 Removing transaction id from Transaction Sales page (5ce7ef26)
* **LIV-3504:**  activity log updated for prod taken array (3c0768a1)
* **LIV-3336:**  settings button is enabled for all kiosks (8d7b6a7c)
* **QRcode:**  Qrcode link updated on download (924ec1dc)
* **kiosk edit:** LIV-3424 hotfix - kiosk does not show capacities after editing the kiosk (70d71e1b)
* **kiosk detail:** LIV-3416 kiosk detail with capacities after deleting loadcell (22113ab7)
* **Kiosk detail:** LIV-3410 inventory maximum capacity calculation hotfix (06f22198)

##### Other Changes

* **dashboard:**
  * sales graph is hidden due to accesscontrol bug" (f44ff436)
  * sales graph is hidden due to accesscontrol bug (7b4f6b11)

#### 1.4.18 (2021-07-19)

##### New Features

* **LIV-3504:**  Updated activity logs with some evnts and filtered scale data (6aa5f88a)
* **settings:**  disable settings btn once it is offline (bad3717a)
* **organizations:** LIV-3470 countrypicker (6e4b4199)
* **kiosk list:** LIV-3451 search by kiosk name or serial number (a6b13938)

##### Bug Fixes

* **LIV-3504:**  activity logs for prod touched updated (c7e5aba6)
* **Kiosk detail:** LIV-3410 inventory maximum capacity calculation hotfix (8986aa1e)
* **QRcode:**  Qrcode link updated on download (952757b1)
* **Kiosk Details:** LIV-3372 Edit or new Kiosk Details page Input validation (690555a7)
* **Product Detail:**
  * LIV-3373 Input Field formate removed default zero for all fields (bf3f85b1)
  * LIV-3373 Input Field formate (ba4560ec)
* **Kiosk Details Activity Log:**
  * LIV-3379 Kiosk Activity Product Touched and Product taken zero Value removed (992779d7)
  * LIV-3379 Kiosk Activity Product Touched and Product taken Implemented (e435509c)
* **delete load cell:**  LIV-3450 Fixing the deleting of load cell for non empty quantity (790e9f03)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into staging-master (eed3fbed)
* //gitlab.com/livello-network/livello-mission-control into fix/deleteLoadCell (27b9daef)
* //gitlab.com/livello-network/livello-mission-control into productsSorting (8326bf79)

#### 1.4.16 (2021-07-19)

##### New Features

* **LIV-3504:**  Updated activity logs with some evnts and filtered scale data (6aa5f88a)
* **settings:**  disable settings btn once it is offline (bad3717a)
* **organizations:** LIV-3470 countrypicker (6e4b4199)
* **kiosk list:** LIV-3451 search by kiosk name or serial number (a6b13938)

##### Bug Fixes

* **LIV-3504:**  activity logs for prod touched updated (c7e5aba6)
* **Kiosk detail:** LIV-3410 inventory maximum capacity calculation hotfix (8986aa1e)
* **QRcode:**  Qrcode link updated on download (952757b1)
* **Kiosk Details:** LIV-3372 Edit or new Kiosk Details page Input validation (690555a7)
* **Product Detail:**
  * LIV-3373 Input Field formate removed default zero for all fields (bf3f85b1)
  * LIV-3373 Input Field formate (ba4560ec)
* **Kiosk Details Activity Log:**
  * LIV-3379 Kiosk Activity Product Touched and Product taken zero Value removed (992779d7)
  * LIV-3379 Kiosk Activity Product Touched and Product taken Implemented (e435509c)
* **delete load cell:**  LIV-3450 Fixing the deleting of load cell for non empty quantity (790e9f03)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into staging-master (eed3fbed)
* //gitlab.com/livello-network/livello-mission-control into fix/deleteLoadCell (27b9daef)
* //gitlab.com/livello-network/livello-mission-control into productsSorting (8326bf79)

#### 1.4.15 (2021-07-06)

##### New Features

* **kiosk list:** LIV-3451 search by kiosk name or serial number (a6b13938)

##### Bug Fixes

* **delete load cell:**  LIV-3450 Fixing the deleting of load cell for non empty quantity (790e9f03)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into fix/deleteLoadCell (27b9daef)

#### 1.4.14 (2021-07-05)

##### Bug Fixes

* **delete load cell:**  LIV-3450 Fixing the deleting of load cell for non empty quantity (790e9f03)
* **kiosk list:** LIV-3289 kiosk sort by serial number fixed (8e6f063d)
* **Kiosk Details, Organization, Products:** LIV-3446 Components are retouched for Web and Mobile Optimization (263caf44)
* **product detail:** LIV-3406 product image upload bug fix (7c4e77cf)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into fix/deleteLoadCell (27b9daef)

#### 1.4.13 (2021-07-05)

##### Bug Fixes

* **kiosk list:** LIV-3289 kiosk sort by serial number fixed (8e6f063d)
* **Kiosk Details, Organization, Products:** LIV-3446 Components are retouched for Web and Mobile Optimization (263caf44)
* **product detail:** LIV-3406 product image upload bug fix (7c4e77cf)

#### 1.4.12 (2021-06-25)

##### Bug Fixes

* **product detail:** LIV-3408 image uploading will not accept images of all sizes (9f5fc39f)
* **Change Kiosk Status Logic:** LIV-3426 Update Kiosk Status (abcca212)
* **Planogram:** LIV-2906 Kiosk Planogram Column Overlapping Issue Resolved (90a3ae87)
* **Users Details:** LIV-3257 Mobile Optimization for Users Background Color (06cb76a4)

#### 1.4.11 (2021-06-23)

##### New Features

* **kiosk detail:** LIV-3386 kiosk planogram delete loadcell - resolver changed from deactivateLoadcell to deleteLoadcell (a6e608cd)

##### Bug Fixes

* **product create:** LIV-3406 uploading image when creating product rewritten completely (3d6da048)
* **product detail:**
  * LIV-3406 image upload modifications (dc508025)
  * LIV-3406 product detail image upload complete rewritten (0cee9b61)
* **Users Details:** LIV-3258 Mobile Optimization for Users (8de826af)
* **Kiosk Activity:**
  * LIV-2242 Fixing  Line Issue updated (41469812)
  * LIV-2242 Fixing  Line Issue (fd85d0eb)
  * LIV-2242 Fixing  Line Issue (cc7d85b2)
  * LIV-2761 Fixing  Line Issue (ef72f54e)
* **product image upload:** LIV-3406 image upload is now changed to base64 string upload instead of file upload (f6cdd7cf)
* **Navbar:** LIV-2761 Fixed Navbar Scroll Issue (af387ba5)
* **users page:** LIV-3258 users table mobile view alternate color for table row fixed (e6229125)
* **Users details:**
  * LIV-3258 Users Mobile Page Optimization (0a7aa001)
  * LIV-3258 Users Mobile Page Optimization (5e221e7d)
* **Users:**  LIV-3258: Mobile View: Users Overview (e31bb55a)

#### 1.4.10 (2021-06-11)

##### New Features

* **temp log:** LIV-3381 download CSV button (731ea996)

#### 1.4.9 (2021-06-11)

##### Bug Fixes

* **products overview:** product search regexI updated to regex and options (54dba66d)
* **kiosk overview:**  search fridge regexI updated to regex and options (756910f1)
* **Dashboard:**  LIV-2724: hide graph in mobile view (28e488d0)

#### 1.4.8 (2021-06-07)

##### Bug Fixes

* **users:** LIV-3128 removed revoke root button for the user if the user is same as the logged in user (4bf7d2e3)
* **Transaction Heading:**  LIV-3362: Transaction heading updated for small device (cbc30a5c)
* **All Dropdowns:**  LIV-3366: Ellipsis for selected Items in All dropdowns (bf28cafe)
* **product form:**  LIV-3368 add product save issue fixed (3be40063)

#### 1.4.7 (2021-06-01)

##### New Features

* **product form:** LIV-3369 auto populate shelf size capacities (463c1164)

#### 1.4.6 (2021-06-01)

##### New Features

* **product form:** LIV-3368 profuct form - add product/edit product changes (fde895e2)

##### Bug Fixes

* **Dashboard- Alerts Show all Margin:**  LIV-3362: Alerts Show all Margin Modified (960c3f24)
* **kiosk detail:** LIV-3364 load cell change product kiosk level price after deleting active price from product detail (b0535484)

#### 1.4.5 (2021-05-28)

#### 1.4.4 (2021-05-28)

##### Bug Fixes

* **kiosk detail:** LIV-3364 load cell change product kiosk level price after deleting active price from product detail (1ccf90fd)
* **Kiosks - Kiosk Overview:**
  *  LIV-3247: Sync/Restart Activity log Icons (47879226)
  *  LIV-3211: Adjust the color of Planogram/Inventory (6ab18916)
* **LIV-2107:** Revert LIV-2107 to filter all kiosks option (a81077af)
* **Product Tab - Widgets Show Wrong Value:**  LIV-3207:  Widget for Most Sold Product Updated (29735464)
* **statsCarrd:**  txt length reduced for ellipsis (0a07b728)
* **Mobile View - Kiosk Details - Inventory:**  LIV-3253:  Kiosk details Inventory Table Updated (4bebf0f5)
* **Mobile View - Kiosk Details - Kiosk Overview Body:**  LIV-3251:Kiosk Overview Body Updated (710894bf)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into staging-master (0f9c6e5d)

#### 1.4.3 (2021-05-17)

##### Bug Fixes

* **user logs:** LIV-3318 payment methods of event object bug fix (f9337986)

#### 1.4.2 (2021-05-17)

##### New Features

* **LIV-3256:** Kiosk Offline error message while update kioskProps (b94b9979)

##### Bug Fixes

* **kiosk details:** LIV-2107 kioskGridResolver call is removed (0800f482)
* **test:**  test to reset css chunks (e36de492)
* **cache:**  disables css and js cache (41dce052)
* **CSSChunk:**  CSS chunk failed resolved by hard reload (fd35a2f3)
* **chunkError:**  Css chunks after the ng-cli update resolved (c2ae84b4)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into staging-master (9295a7fc)

#### 1.4.1 (2021-05-12)

##### Bug Fixes

* **Mobile View - Kiosk Details - breadcrumb:**  LIV-3249:Menu Redesign (e356af56)
* **Mobile View - Kiosk Details - Inventory:**  LIV-3253:  Kiosk details Inventory Table Updated (4707d459)
* **kiosks:** sagas fixed (646edbe3)

### 1.4.0 (2021-05-12)

##### Bug Fixes

* **Mobile View - Kiosk Details - breadcrumb:**  LIV-3249:Menu Redesign (e356af56)
* **Mobile View - Kiosk Details - Inventory:**  LIV-3253:  Kiosk details Inventory Table Updated (4707d459)
* **kiosks:** sagas fixed (646edbe3)

#### 1.3.42 (2021-05-12)

##### Bug Fixes

* **user logs:** LIV-3267 SEPA payment status set to PENDING from NOT PAID (61e54585)
* **Mobile View Optimization-Transaction Tables:**  LIV-3255:  Updated All Trasaction Tables Component and added Horizontal Scrollable Functionality (92f51bb1)
* **Mobile View Optimization:**
  *  LIV-3254:  Updated Custom Table Component and added Horizontal Scrollable Functionality (7f911a4e)
  *  LIV-3254:  Updated Custom Table Component and added Horizontal Scrollable Functionality (ca8f90ea)

#### 1.3.41 (2021-05-11)

##### Bug Fixes

* **kiosk details:** LIV-3240 qr code PDF download fix (111886fd)
* **Dashboard, Kiosks, Organizations, Products :**  LIV-3233: Tables Headers Border Updated (48b5d552)
* **Transaction-Products:**  LIV-3236: Headers Border Updated (80ff0c59)
* **Transaction:**
  *  LIV-3224: Products:Widgets number format (2b43b049)
  *  LIV-3224: Products:Widgets number format (65272563)
  *  LIV-3223: Refills:Widgets number format (4d33c2d3)
  *  LIV-3222: Sales:Widget number format (b3412154)
  *  LIV-3093:Sales and Refills Table Fixed (2b3b25bb)
* **Dashboard:**  LIV-3225: Dashboard:Widgets number format (f640d39e)
* **Transaction/Activity Log:**  LIV-2973: Date/Time Formate (492b1c2e)
* **Transactions/Activity Log:**  LIV-2973 Time Date Formate (83f6dbc0)
* **LIV-2835:**  refills KPI fix (fccaf23d)

#### 1.3.40 (2021-05-04)

##### New Features

* **user details:** LIV-3164 payment methods display texts updated (8a56d124)

##### Bug Fixes

* **LIV-2835:**
  *  KPI card fix (cecffa6d)
  *  layout fix (714de345)
  *  Fixed card issue and the  productline null value (29a16fe4)
* **KPI:**  Layout and font changes (bf871628)
* **modal load cell:** LIV-2326 shelf size not saving bug fix (507dfb11)

#### 1.3.39 (2021-04-30)

##### Build System / Dependencies

* **LIV-2835:**  KPI widgets designed for refills (5a6b1c1f)

##### New Features

* **kiosk details:** LIV-2326 load cell occupany and detail inventory (84cc57d3)
* **kiosk planogram:** LIV-2326 loadcell occupancies (5e8d2646)

##### Bug Fixes

* **Dashboard Alerts:**  LIV-3155 Slow Alert Table Updated (6573e845)
* **LIV-3152:**  edit planogram error fix (8a165e2c)

#### 1.3.38 (2021-04-30)

##### Build System / Dependencies

* **LIV-2835:**  KPI widgets designed for refills (5a6b1c1f)

##### New Features

* **price histroy:** LIV-2276 delete active price history feature added (41581778)

##### Bug Fixes

* **Dashboard Alerts:**  LIV-3155 Slow Alert Table Updated (6573e845)
* **LIV-3152:**  edit planogram error fix (8a165e2c)

#### 1.3.37 (2021-04-26)

##### New Features

* **modify load cell:** LIV-3122 surface size changing (7792111e)

##### Bug Fixes

* **Mobile-Transaction-Product:**  LIV-3087:Product Transaction Mobile View Optimized (f2d89e0b)
* **kiosks:** sagas fixed (ee317d5b)

#### 1.3.36 (2021-04-23)

##### Bug Fixes

* **product detail:** LIV-3134 random price history shown for create product screen - bug fixed (b691aa20)
* **Product Detail Article Number:**
  *  LIV-2826:Article Number on Product updated with null check (a4af814e)
  *  LIV-2826:Article Number on Product will be updated for each product (976177ba)
* **User Profile Bar:**
  *  LIV-3097:Long UserName and Email OverFlow Fix updated (909aec6e)
  *  LIV-3097:Long UserName and Email OverFlow Fix (d7f6379e)
* **Trasactions CSV Button:**  LIV-2953: CSV Button Filter Functionality Updated (4e73a00b)
* **Kiosk Activity Log:**  LIV-2825: Activity Log updated (7b90ca4f)
* **Dashboard Chart:**
  *  LIV-3012: Shortedn the text of days (aaa4258e)
  *  LIV-3012: Shortedn the text of days (2a0127d4)
  *  LIV-3012: Origntation of the Days at chart (428b9ad5)
* **Kiosks:**  LIV-2915: Out of Service Header (5a8fdec2)
* **LIV-3079:**  card txt size fixed (f575d34d)
* **Kiosks Filter Option:**  LIV-3050: Placeholder of Kiosk Dropdown Updated (dca67dfb)
* **transactions-products:** LIV-3133 kpi resolver called twice removed (5a1d2917)

##### Other Changes

*  Refills CSV Download): LIV-3135: CSV Button Filter Functionality Updated (12ff7c2e)
* **LIV-3079:**  KPI widgets sales design changed (057df3f4)
* **LIV-3080:**  KPI design changed (64006a59)
* **LIV-3111:** Changed the design of KPI widgets (7ae9ffcb)

#### 1.3.35 (2021-04-19)

##### Build System / Dependencies

* **QRcode:**  updated QRcode link (db4fc718)

##### New Features

* **LIV-3100:**  Changed the format of address column (cfbcc3c9)

##### Bug Fixes

* **Transactions-refills:** LIV-3133 refils KPI resolver called for the second time is removed as it is not necessary (804cb6a7)
* **transaction-sales:** LIV-3133 KPI data called for the second time is removed as it it not necessary (bbcfa14d)
* **LIV-3095:**  Alert info icon visible (db7f241c)
* **LIV-3105:**  inventory sorted in asc (95823c09)
* **LIV-3104:** default price fixed to 2 decimal places (4505a057)
* **LIV-3102:**  directions/notes format changed (b5756be4)
* **LIV-3103:**  notes and address lines bug (1aab87bb)
* **Users:**  LIV-2869:User Cards to Member Cards (236ecc64)
* **Transactions:**
  *  LIV-2661 : Products Products Filter Hide (827cf6ec)
  *  LIV-2661 : Products Fileters (475b62f4)
* **Dashboard:**  LIV-2799 : Tooltip fixed (7de53b9b)
* **Products:**  LIV-2951 : dropdown category space added (5ae8d99b)
* **Dashboard Alert:**  LIV-2799 : tooltip added on Alert Button (5f212702)
* **Products Dropdown:**
  *  LIV-2951 Dropdown option fixed for Categories (f86ed720)
  *  LIV-2951 Dropdown option fixed for Categories (5ca78e1f)
* **products list:** LIV-2951 toolbar unsed code causing white screen fixed (e51dbf71)
* **product detail:**
  * LIV-1952 price history widget price format fixed (2a02a55c)
  * LIV-1952 price format fixed (7d1df5f9)
  * LIV-1952 date format fixed in the component (7ddb81b0)
* **Standardised Format:**
  *  LIV-2793 Temp formate updated (c55190e2)
  *  LIV-2793 Temp formate updated (f78ef1af)

#### 1.3.34 (2021-04-12)

##### New Features

* **product detail:** LIV-1952 price history show all page (dabd8c70)

##### Bug Fixes

* **products list:** LIV-2951 toolbar unsed code causing white screen fixed (e51dbf71)
* **Products Dropdown:**  LIV-2951 Dropdown option fixed for Categories (5ca78e1f)
* **Product:**  LIV-2951 Scrolling bar is fixed (f640a053)

#### 1.3.33 (2021-04-12)

##### New Features

* **product detail:** LIV-1952 price history show all page (dabd8c70)

##### Bug Fixes

* **product detail:**
  * LIV-1952 € symbol fixed for price field in price history table (ea1190c4)
  * LIV-1952 price history no show all button if less than 10. (8f4b7596)
  * LIV-1952 price history show all page (dabd8c70)

##### Bug Fixes

* **Product:**  LIV-2951 Scrolling bar is fixed (f640a053)
* **User Layout Fix:**  LIV-2534 pagination fontsize fixed (a47694b7)
* **Standardised Format:**
  *  LIV-2793 Updated Alignment of table (d655445d)
  *  LIV-2793 Updated Alignment of table (f93461a4)
* **Kiosk Page Filter Options:**  LIV-2382 Update placeholder (7d8517a4)

#### 1.3.32 (2021-04-06)

##### Build System / Dependencies

* **LIV-2963:**  Updated both the PINs in the form page (805189be)

##### New Features

* **product detail:** LIV-1952 price history widgets (cbbcb43f)
* **kiosk:**  add download pack and order list buttons (9188b2d2)

##### Bug Fixes

* **products:**  products list screen search filter lodash import (686d116c)
* **LIV-2981:**  filter issue for all tables solved except orgTable (02ff9106)
* **Kiosks:**
  *  LIV-2950 Download Order list and Download Pack list Date has been added (014556d6)
  *  LIV-2950 Download Order list and Download Pack list (35dc774c)
  *  LIV-2950 Download Buttons for OrderList and PackList (d0958243)
  *  LIV-2950 Download Buttons for OrderList and PackList (07e54fed)
  *  LIV-2382 Dropdown Options updated (d902adfe)
* **pin:**  pin request to create/update the kiosk (84a77037)
* **logs:**  removed logs (8aa0a6d6)
* **playlist:**
  * commented out the playlist URL (143dc927)
  *  show header when the array exists (3fa67aa0)
* **Users Pagination, User Content:**
  *  LIV-2534 Pagination and top , bottom margin updated (9834e6ef)
  *  LIV-2534 (63536fc0)
* **LIV-2865:**
  * duration validation fixed (11ced78e)
  *  layout fix and submit only on validation (8574f6bd)
  *  duration validation  and responsive fixes (f6e75055)
* **Mobile View Sidebar Position:**  LIV-2761 (28a856d5)
* **Transactions:**
  *  LIV-2096 (f6851af0)
  *  LIV-2096 (96390549)
  *  LIV-2096 Products with options to change date, Kiosk Id and poductline (c7eb07ff)
  *  LIV-2096 Products with options to change date, Kiosk Id and poductline (6cda6b8e)
  *  LIV-2096 Transaction=> Product Table header (80889cd5)
  *  LIV-2096 Transaction=> Product Table header (32017fea)
  *  LIV-2096 Transaction=> Product Table (cf20b8ee)
* **ID:**  Id update and playlist fixes (8397732d)
* **Transactions-Sales:** LIV-2949 fixed the null handling in a proper manner (af0d317c)

##### Other Changes

* //gitlab.com/livello-network/livello-mission-control into LIV-2950 (e9b658e1)
*  Refilss): LIV-2836 total cost value and total sales value added (6ee81f7a)
* //gitlab.com/livello-network/livello-mission-control into staging-master (cbffac74)
* **kiosk details:**  LIV-2726 Kiosk Details" (065c0765)
* **product:** LIV-1952 product price histroy widget (93d40daf)

#### 1.3.31 (2021-03-19)

##### Bug Fixes

* **Transactions-Sales:** LIV-2949 fixed the null handling in a proper manner (af0d317c)
* **Transactions-Refills:** LIV-2957 resolver name changed to getDefaultTotalCostValueOfRefills (2da2fee6)
* **img:**
  *  img path fixed to reset it (a3b2013d)
  *  retrieves uploaded image (6db3b55c)
* **fileName:**  name case sensitive fixed (411b47d9)

#### 1.3.30 (2021-03-17)

##### Build System / Dependencies

* **LIV-2865:**
  *  added gql for update and delete playlist (ad494029)
  * Add Image in Playlist screen (8738b094)
  *  content playlist screen update (8c34c529)

##### Bug Fixes

* **LIV-2948:** error in OrgGrid resolved (f850a6ea)

#### 1.3.29 (2021-03-17)

#### 1.3.28 (2021-03-17)

##### Build System / Dependencies

* **LIV-2923:** updated the qrcode link to accomodate the slug and appleId (52b3f56c)

##### New Features

* **dashboard graph:** LIV-2911 kiosk options in the graph should be in ascending order (2a3ad66e)

#### 1.3.27 (2021-03-12)

##### New Features

* **delete load cell:** LIV-2327 isActive field is used to display loadcell on the planogram (175b3048)

##### Bug Fixes

* **validation:**  PIN validationa and complete Yup validation and some bug fixes (ae9ea9f7)
* **PIN:**  Validated for max 4digits, numeric, positive (86a695b5)
* **log:**  rm logs (15659a68)
* **settings:**  Pin validation and both the pins can'be the same (c1a3c897)
* **kiosk details:**  LIV-2726 Kiosk Details (89fb4af2)

#### 1.3.26 (2021-03-09)

##### Bug Fixes

* **addscale modal:** LIV-2327 quantity field not to be mandatory - fixed (5e5ad855)
* **Dashboard:**
  *  LIV_2725 mobile responsive datepicker: Different date picker for different Screen size (acd91813)
  *  LIV-2724 mobile responsive dashboar: Alerts Table, Almost Empty and Sub Components (6c4bce57)

#### 1.3.25 (2021-03-09)

##### Build System / Dependencies

* **LIV-2820:** Added pin on the settings page and removed from kiosk page (16005f63)

##### Bug Fixes

* **KioskPlanogram:** LIV-2327 position warning on add scale and switch position bug fix (95488b61)
* **LIV-2820:**
  * field name bug (d6489e03)
  *  added technician pin in the gql (c6237468)
* **dateField:**
  *  dateField changed for alerts dateRange (62674bb4)
  *  Date field is changed to 'startDate' (d6dca33f)
* **LIV-2794:**  field  for dateRange is changed (a51d16f8)
* **Kiosk Dedtails:**  LIV-2723: Mobile Responsive Problems Resolved (da5e42d0)

#### 1.3.24 (2021-03-05)

##### Bug Fixes

* **Kiosk-loadcell:** delete/edit loadcell complete (45aac5e4)
* **LIV-2833:**  Street name alone not submitted beacuse of null exists (061db9d3)

#### 1.3.23 (2021-03-03)

##### Build System / Dependencies

* **LIV-2833:**  remove the mandatory for address field (00a4539f)
* **LIV-2794:**  resolved pagination and added loading screen (efa026cd)

##### New Features

* **Edit/Delete Loadcell:** Merge into LIV-2327 (b47760a7)
* **delete loadcell:** LIV-1800 delete load cell (535728de)
* **Kiosk-LoadCell Modal:**  LIV-2327 Cable ID should be editable (c1cd3194)

##### Bug Fixes

* **LIV-2794:**  Datepicker format is changed (5b5b636f)
* **Date Picker:**  LIV-2625: Datepicker length updated (f98b24a9)
* **LIV-2833:**  Make the address field required in user form (3ad06d59)
* **Kiosk:**  LIV-2647: Kiosk Info Address formate Updated (d4e009d9)
* **Dashboard:**  LIV-2723: log statements removed (c3ed7e6e)
* **kiosk details Mobile Responsive:**  LIV-2723  Koisk Detail and sub components (3d72aadf)

#### 1.3.22 (2021-02-26)

##### Build System / Dependencies

* **LIV-2805:**  hidden the add kiosk btn for admin and validated serialnumber on creation (8390b2c9)

##### New Features

* **datepicker:** LIV-2725 updated date picker component for mobile view (d42dfd5a)

##### Bug Fixes

* **Dashboard:**  LIV-2725: Margin issue resolved (9a3d8161)
* **deshboard Kiosk Transactions:**  LIV-2725:Searchbox Dropdown and Button Responsiveness feature is added (b66dd3e4)
* **deshboard Kiosk Products Transactions Refils and Sales:**  LIV-2793 Formate of Table Updated (d5b833b5)

##### Other Changes

* livello-network/livello-mission-control into staging-master (9fbf6f2a)

#### 1.3.21 (2021-02-23)

##### Bug Fixes

* **transactions:**  swap column order for 'Article Number' (daf82245)
* **Transactions:**
  *  LIV-2827: Article Number Column is added in Sales and Refills Table (2a1c27b4)
  *  LIV-2827: Article Number Column is added in Sales and Refills Table (29c030f0)

#### 1.3.20 (2021-02-18)

##### Build System / Dependencies

* **LIV-2795:**  added 3 more columns to alerts table (f1527f90)
* **liv-2591:**  change landing page (1653ab84)

##### New Features

* **refills:**  update grid refills cost (8c9251e8)

##### Bug Fixes

* **Dashboard Alert:**
  *  LIV-2824: Hide Duration, Severity and Status Column in Show all Table (ea53ee2c)
  *  LIV-2824: Hide Duration, Severity and Status Column (e844d942)
* **Kiosk Settings Tooltip:**  LIV-2790: Tooltip added for default support language (f9ede372)
* **LIV-2591:**  logging out renewing the token instantly resolved (a923376d)
* **kiosk Settings:**  LIV-2672 Model Msg Updated (87b95fd2)
* **LIV-2751:**  PackageOptions fetch old data bug solved (53ea3181)

#### 1.3.19 (2021-02-15)

##### Build System / Dependencies

* **LIV-2795:**  added 3 more columns to alerts table (f1527f90)
* **liv-2591:**  change landing page (1653ab84)

##### New Features

* **refills:**  update grid refills cost (9550350b)

##### Bug Fixes

* **refills:**  cost - number of signs after comma fixed to 2 (7071cf9b)
* **LIV-2591:**  logging out renewing the token instantly resolved (a923376d)
* **kiosk Settings:**  LIV-2672 Model Msg Updated (87b95fd2)
* **LIV-2751:**  PackageOptions fetch old data bug solved (53ea3181)

#### 1.3.18 (2021-02-01)

##### Bug Fixes

* **kiosk settings:**  LIV-2681 member card tool tip updated (48bb727d)

#### 1.3.17 (2021-02-01)

##### Bug Fixes

* **kioskProps:** LIV-2681 planogram fixed after updating kiosk settings (20635245)
* **kiosk settings:**  age restirction warning message chaned to german (67004d0f)

#### 1.3.16 (2021-01-29)

##### Bug Fixes

* **kiosk settings:**  warning color, out of service modal no confirmation (49296f3c)
* **liv-2717:**  membercard issue to revert back when there's no change (2d967165)

##### Other Changes

* **dashboard,kiosk,transactions:**  update the name of kiosks. (d46ee5b4)

#### 1.3.15 (2021-01-26)

##### Bug Fixes

* **Transactions:** LIV-2680 date filters updated to locale based filtering (5a9e5ac2)
* **kiosk Settings:**  LIV-2672 Confirmation msg on putting Koisk Out of Service (2688d83a)
* **kiosk Settings Warning Color:**  LIV-2671 Warning Color Changed from Red to Orange (5396d239)
* **kiosk Settings title:**  LIV-2673 Title Updated from General Settings to Kiosk Settings (83915c08)
* **kiosk details Temp Log:**
  *  LIV-2679 Temp Log table modified (b5af4a0d)
  *  LIV-2679 Temp Log table modified (4af2e43a)
* **kiosk details:**  LIV-2683 Products Field updated to Planogram Position (b6a9d4ed)

#### 1.3.14 (2021-01-22)

##### Bug Fixes

* **create/edit product:** LIV-2678 (1bdfe856)

##### Other Changes

* **kiosks reducer:** kiosk default set to null (d6c1ba69)

#### 1.3.13 (2021-01-22)

##### Bug Fixes

* **kiosk-settings:** LIV-2681 memeber card enable/disable consitency issue fixed (302c40c4)

#### 1.3.12 (2021-01-19)

##### Bug Fixes

* **kiosk properties:**  allow access to admins to kiosk general settings. (27bee65f)
* **device settings:**  change logic for member card to make it work properly with ZVT software. (5727f3e5)

##### Other Changes

* **SideMenu:**  Showing Version of Mission Controller (d937245a)
* **service out of time:**  activate service out of time without time range. Also, refactor for warning messages on kiosk general settings page. (e57ca1c9)
* **kiosk details:**  LIV-2642 Message on changing paymenttype to GyroCard only (6c51d74f)

#### 1.3.11 (2021-01-13)

##### Bug Fixes

* **kiosks-list:**  sales 24h changed to sales today (eb0b8c71)
* **liv-2549:**
  *  setting UI changes (ac2fb835)
  *  setting screen for kiosk (eb75a2b5)
* **Users Details:**  LIV-2534 User Layout Fix (cba4e4f1)
* **manage screen:** service check time swapped (d7f30987)

##### Other Changes

* **Product Details:**
  *  LIV-2472 new field in Forms with Article Number (af9a6f40)
  *  LIV-2182 Input Field Validation (bbd007c9)
* **Users Details:**  LIV-2558 Logo Updated (84711385)

#### 1.3.10 (2021-01-06)

##### Build System / Dependencies

* **liv-2585:**  manage age restriction and disable out of service (fc1cae83)

##### Bug Fixes

* **kiosk settings:** LIV-2585 updated GrqphQL schema and submit handler (5ca2c4bf)
* **liv-2549:**
  *  setting UI changes (ac2fb835)
  *  setting screen for kiosk (eb75a2b5)
* **Users Details:**  LIV-2534 User Layout Fix (cba4e4f1)
* **manage screen:** service check time swapped (d7f30987)

##### Other Changes

* **kiosk-settings:** LIV-2585 service time commented (04173861)
* **Product Details:**
  *  LIV-2472 new field in Forms with Article Number (af9a6f40)
  *  LIV-2182 Input Field Validation (bbd007c9)
* **Users Details:**  LIV-2558 Logo Updated (84711385)

#### 1.3.9 (2020-12-18)

##### Other Changes

* **planogram-loadcell:** LIV-2485 image style + popup trigger size normal (63eeb42b)
* **kiosk details:**  LIV-2485 Show Pop Up (1716289e)

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
