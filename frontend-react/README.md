# FRONTEND

## 🧩 Architettura Redux Toolkit

> Questa sezione descrive in modo sintetico come è organizzato lo **store Redux** nel frontend, seguendo un'architettura modulare e tipizzata (TypeScript) basata su Redux Toolkit.

---

### 📦 Struttura delle cartelle Redux Toolkit

- **src/**
  - **store/**
    - **slices/** → Singoli slice (`authSlice.ts`, `customerSlice.ts`, `productSlice.ts`, `orderSlice.ts`, `warehouseSlice.ts`)
    - **thunks/** → Funzioni asincrone per le chiamate API (`authThunks.ts`, `customerThunks.ts`, `productThunks.ts`, `orderThunks.ts`, `warehouseThunks.ts`)
    - `index.ts` → Configurazione principale dello store
  - **hooks/** → Hook tipizzati (`redux.ts`)
  - _... altre cartelle (components, pages, utils, etc.)_

---

### 1️⃣ Creazione degli slice

- Ogni slice rappresenta una porzione indipendente dello stato globale.
- Definizione:
  - Stato iniziale
  - Reducers per azioni sincrone
  - `extraReducers` per gestire le thunk asincrone

### 2️⃣ Creazione delle thunk asincrone

- Si usano createAsyncThunk per le chiamate API.

- Possibile accedere allo stato globale tramite getState (es. per recuperare il token).

### 3️⃣ Configurazione dello store

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

### 4️⃣ Configurazione degli hook

In `src/hooks/redux.ts`:

- Export degli hook personalizzati:

```ts
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## 🧭 Architettura delle pagine e delle rotte

> Questa sezione descrive l’organizzazione del modulo frontend relativo a pagine, rotte e logiche dei componenti.
> L’architettura è pensata per massimizzare la modularità, separare la logica dalla presentazione e garantire scalabilità grazie a React + TypeScript.

### 📦 Struttura delle cartelle delle pagine e delle rotte

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

    - customers.ts → `useCustomersLogic()`

    - products.ts → `useProductLogic()`

    - orders.ts → `useOrdersLogic()`

    - warehouses.ts → `useWarehousesLogic()`

  - _... altre cartelle (`components`, `pages`, `utils`, etc.)_

### 1️⃣ Definizione delle rotte

- In AppRoutes.tsx vengono dichiarate le rotte principali (es. /customers, /products, ecc.).

- ProtectedRoutes.tsx funge da wrapper per controllare l’accesso alle rotte riservate, verificando lo stato di autenticazione.

### 2️⃣ Entry point delle pagine

- Ogni file in pages/ rappresenta l’entry point per una singola pagina.

- Le pagine non contengono logica diretta, ma si occupano di:

  - Importare i componenti UI.

  - Importare gli hook che gestiscono la logica.

  - Passare dati e callback ai componenti tramite props.

### 3️⃣ Logica separata tramite hook

- Per ogni entità principale (es. clienti, prodotti) esiste un hook dedicato nella cartella hooks/ (es. useCustomersLogic).

- L’hook gestisce:

  - Stato locale.

  - Effetti collaterali (fetch iniziale, aggiornamento dati).

  - Chiamate API (tramite thunk o funzioni asincrone).

  - Eventuali filtri o trasformazioni sui dati.

  - Gli hook vengono utilizzati nelle rispettive pagine per mantenere il codice dei componenti il più “dumb” possibile.

### 4️⃣ Composizione dei componenti

- Le pagine sono composte da componenti modulari:

  - Header
  - Stats
  - Filtri
  - Tabelle
  - Modali

- I componenti ricevono solo dati e callback tramite props; non contengono logica interna complessa.

---

## Logica della pagina Clienti

### Descrizione generale

> La pagina Clienti consente la gestione completa dell’anagrafica clienti: visualizzazione, ricerca, inserimento, modifica ed eliminazione.

La logica principale è suddivisa in due hook personalizzati:

- useCustomerForm → gestione e validazione del form cliente

- useCustomersLogic → orchestrazione dell’interazione utente, stato dei modali e invocazione dei thunk

### 1️⃣ Gestione del form: `useCustomerForm()`

- Mantiene lo stato locale del form (nome, email, telefono, indirizzo)

- Gestisce errori di validazione

- Espone funzioni di utilità per validare e resettare il form

- Validazione: verifica campi obbligatori, formato email e unicità dell’email rispetto ai clienti già presenti (eccetto quello in modifica)

- Reset: ripristina i valori iniziali e cancella eventuali errori

- Parametri:

  - customers: lista completa dei clienti dal Redux store

  - selectedCustomer: cliente attualmente in modifica (se presente)

### 2️⃣ Logica operativa: `useCustomersLogic()`

- Recupera e filtra la lista clienti

- Gestisce selezione del cliente corrente

- Coordina apertura/chiusura dei modali per aggiunta, modifica, eliminazione

- Gestisce lo stato di caricamento (salvataggio o cancellazione in corso)

- Orchestrazione delle chiamate asincrone ai thunk Redux per CRUD

### Focus dettagliato sulle funzioni

📥 Recupero dati

- All’avvio (tramite useEffect), viene invocato fetchCustomers per caricare la lista aggiornata dei clienti.

🔎 Ricerca e filtri

- Stato locale: searchTerm

- Filtro filteredCustomers (calcolato con useMemo): verifica se il termine è contenuto in nome, email o telefono.

- Calcolo topCustomer: cliente con total_spent più alto.

➕ Modale aggiunta

- Funzione `handleAddCustomer`:

  - Resetta il form

  - Apre il modale di inserimento

✏️ Modale modifica

- Funzione handleEditCustomer:

  - Seleziona il cliente da modificare

  - Pre-carica i dati del form

  - Apre il modale di modifica

🗑️ Dialog eliminazione

- Funzione handleDeleteCustomer:

  - Seleziona il cliente da eliminare

  - Apre il dialog di conferma

💾 Salvataggio cliente

- Funzione handleSaveCustomer:

  - Valida il form

  - Se cliente selezionato → aggiornamento

  - Altrimenti → nuovo inserimento

  - Al termine: chiude modale, resetta form e selezione

  - Gestione errori per messaggi user-friendly

✅ Conferma eliminazione

- Funzione handleConfirmDelete:

  - Elimina il cliente selezionato tramite thunk

  - Al termine: chiude dialog e resetta selezione

  - Gestione errori eventuali

🧠 Considerazioni architetturali

- Separazione delle responsabilità:

  - La logica del form è isolata (validazione, gestione valori) rispetto alla logica di pagina (modali, selezione, chiamate API).

- Ottimizzazione:

  - useMemo riduce ricalcoli inutili del filtro.

- UX:

  - Gli stati di caricamento (isSaving) migliorano il feedback visivo, mentre la gestione centralizzata degli errori rende il sistema più robusto.

📦 Dati e stato esposto dal hook

- Nome → Descrizione
- customers → Lista completa dei clienti dal Redux store
- filteredCustomers → Lista filtrata in base al termine di ricerca
- topCustomer → Cliente con maggiore total_spent
- selectedCustomer → Cliente selezionato per modifica o eliminazione
- searchTerm → Testo per filtrare la lista
- isAddModalOpen → Modale aggiunta aperto/chiuso
- isEditModalOpen → Modale modifica aperto/chiuso
- isDeleteDialogOpen → Dialog eliminazione aperto/chiuso
- isSaving → Flag di caricamento durante salvataggio o eliminazione
- formData → Stato locale del form
- formError → Messaggio di errore per validazione o operazioni fallite
- Funzioni → Per orchestrare interazione utente e CRUD (handleAdd, handleEdit, ecc.)
