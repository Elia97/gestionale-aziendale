## 🧩 Architettura Redux Toolkit

> Questa sezione descrive in modo sintetico come è organizzato lo **store Redux** nel frontend, seguendo un'architettura modulare e tipizzata (TypeScript) basata su Redux Toolkit.

---

### 📦 Struttura delle cartelle

- **src/**
  - **store/**
    - **slices/** → Singoli slice (`authSlice.ts`, `customerSlice.ts`, `productSlice.ts`, `orderSlice.ts`, `warehouseSlice.ts`)
    - **thunks/** → Funzioni asincrone per le chiamate API (`authThunks.ts`, `customerThunks.ts`, `productThunks.ts`, `orderThunks.ts`, `warehouseThunks.ts`)
    - `index.ts` → Configurazione principale dello store
  - **hooks/** → Hook tipizzati (`redux.ts`)
  - _... altre cartelle (components, pages, utils, etc.)_

---

### 🧩 Step principali

#### 1️⃣ Creazione degli slice

- Ogni slice rappresenta una porzione indipendente dello stato globale.
- Definizione:
  - Stato iniziale
  - Reducers per azioni sincrone
  - `extraReducers` per gestire le thunk asincrone

#### 2️⃣ Creazione delle thunk asincrone

- Si usano createAsyncThunk per le chiamate API.

- Possibile accedere allo stato globale tramite getState (es. per recuperare il token).

#### 3️⃣ Configurazione dello store

In `src/store/index.ts`:

- Composizione dello stato globale:

```ts
const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    products: productReducer,
    orders: orderReducer,
    warehouses: warehouseReduce,
  },
});
```

- Definizione dei tipi:

```ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

#### 4️⃣ Configurazione degli hook

In `src/hooks/redux.ts`:

- Export degli hook personalizzati:

```ts
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## 🧭 Architettura delle pagine e delle rotte

> Questa sezione descrive l’organizzazione del modulo frontend relativo a pagine, rotte e logiche dei componenti.
> L’architettura è pensata per massimizzare la modularità, separare la logica dalla presentazione e garantire scalabilità grazie a React + TypeScript.

### 📦 Struttura delle cartelle

- **src/**

  - **routes/**

    - AppRoutes.tsx → Definizione dell’albero di routing principale.

    - ProtectedRoutes.tsx → Componente per la protezione delle rotte tramite autenticazione.ts

  - **pages/**

    - DashboardPage.tsx → Pagina principale.

    - CustomersPage.tsx → Gestione clienti.

    - ProductsPage.tsx → Gestione prodotti.

    - OrdersPage.tsx → Gestione ordini.

    - WareHousesPage.tsx → Gestione magazzini.

    - SettingsPage.tsx → Configurazioni dell’applicazione.

  - **hooks/**

    - customers.ts → Hook personalizzato useCustomersLogic che incapsula la logica dei clienti.

    - products.ts → Hook personalizzato useProductLogic che incapsula la logica dei prodotti.

    - orders.ts → Hook personalizzato useOrdersLogic che incapsula la logica degli ordini.

    - warehouses.ts → Hook personalizzato useWarehousesLogic che incapsula la logica dei magazzini.

  - _... altre cartelle (components, pages, utils, etc.)_

### 🧩 Step principali

#### 1️⃣ Definizione delle rotte

- In AppRoutes.tsx vengono dichiarate le rotte principali (es. /customers, /products, ecc.).

- ProtectedRoutes.tsx funge da wrapper per controllare l’accesso alle rotte riservate, verificando lo stato di autenticazione.

#### 2️⃣ Entry point delle pagine

- Ogni file in pages/ rappresenta l’entry point per una singola pagina.

- Le pagine non contengono logica diretta, ma si occupano di:

- Importare i componenti UI.

- Importare gli hook che gestiscono la logica.

- Passare dati e callback ai componenti tramite props.

#### 3️⃣ Logica separata tramite hook

- Per ogni entità principale (es. clienti, prodotti) esiste un hook dedicato nella cartella hooks/ (es. useCustomersLogic).

- L’hook gestisce:

  - Stato locale.

  - Effetti collaterali (fetch iniziale, aggiornamento dati).

  - Chiamate API (tramite thunk o funzioni asincrone).

  - Eventuali filtri o trasformazioni sui dati.

  - Gli hook vengono utilizzati nelle rispettive pagine per mantenere il codice dei componenti il più “dumb” possibile.

#### 4️⃣ Composizione dei componenti

- Le pagine sono composte da componenti modulari:

- Header, stats, filtri, tabelle, modali.

- I componenti ricevono solo dati e callback tramite props; non contengono logica interna complessa.
