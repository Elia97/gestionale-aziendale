# FRONTEND

## Architettura Redux Toolkit

> Questa sezione descrive in modo sintetico come è organizzato lo **store Redux** nel frontend, seguendo un'architettura modulare e tipizzata (TypeScript) basata su Redux Toolkit.

---

### Struttura delle cartelle Redux Toolkit

- **`src/`**
  - **`store/`**
    - **`slices/`** → Singoli slice
    - **`thunks/`** → Funzioni asincrone per le chiamate API
    - **`index.ts`** → Configurazione principale dello store
  - **`hooks/`** → Hook tipizzati
  - _... altre cartelle_

---

### Creazione degli slice

- Ogni slice rappresenta una porzione indipendente dello stato globale.
- Definizione:
  - Stato iniziale
  - `reducers` per azioni sincrone
  - `extraReducers` per gestire le thunk asincrone

---

### Creazione delle thunk asincrone

- Si usano createAsyncThunk per le chiamate API.

- Possibile accedere allo stato globale tramite getState (es. per recuperare il token).

---

### Configurazione dello store

In `src/store/index.ts`:

- Composizione dello stato globale:

```ts
const store = configureStore({
  reducer: { ... },
});
```

- Definizione dei tipi:

```ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

### Configurazione degli hook

In `src/hooks/redux.ts`:

- Export degli hook personalizzati:

```ts
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

---

---

## Architettura delle pagine e delle rotte

> Questa sezione descrive l’organizzazione del modulo frontend relativo a pagine, rotte e logiche dei componenti.
> L’architettura è pensata per massimizzare la modularità, separare la logica dalla presentazione e garantire scalabilità grazie a React + TypeScript.

---

### Struttura delle cartelle delle pagine e delle rotte

- **`src/`**

  - **`routes/`** → Definizione dell’albero di routing principale e protezione delle rotte tramite autenticazione

  - **`pages/`** → Entry point della logica di ogni pagina

  - **`hooks/`** → Hook per gestire la logica e il form per ogni entità
  - _... altre cartelle_

---

### Definizione delle rotte

- In `AppRoutes.tsx` vengono dichiarate le rotte principali.

- `ProtectedRoutes.tsx` funge da wrapper per controllare l’accesso alle rotte riservate, verificando lo stato di autenticazione.

---

### Entry point delle pagine

- Ogni file in `pages/` rappresenta l’entry point per una singola pagina.

- Le pagine non contengono logica diretta, ma si occupano di:

  - Importare i componenti UI.

  - Importare gli hook che gestiscono la logica.

  - Passare dati e callback ai componenti tramite props.

---

### Logica separata tramite hook

- Per ogni entità principale esiste almeno un hook dedicato nella cartella `hooks/`.

- L’hook gestisce:

  - Stato locale.

  - Effetti collaterali (fetch iniziale, aggiornamento dati).

  - Chiamate API (tramite thunk o funzioni asincrone).

  - Eventuali filtri o trasformazioni sui dati.

---

### Composizione dei componenti

- Le pagine sono composte da componenti modulari:

  - Header
  - Stats
  - Filtri
  - Tabelle
  - Modali

- I componenti ricevono solo dati e callback tramite props; non contengono logica interna complessa.

---

---

## Logica della pagina Clienti

### Descrizione generale

> La pagina Clienti consente la gestione completa dell’anagrafica clienti: visualizzazione, ricerca, inserimento, modifica ed eliminazione.

La logica principale è suddivisa in due hook personalizzati:

- `useCustomerForm()` → gestione e validazione del form cliente

- `useCustomersLogic()` → orchestrazione dell’interazione utente, stato delle modali e invocazione dei thunk

---

### Gestione del form: `useCustomerForm()`

- Mantiene lo stato locale del form (`name`, `email`, `phone`, `address`)

- Gestisce errori di validazione

- Espone funzioni di utilità per validare e resettare il form

- Validazione:

  - verifica campi obbligatori
  - verifica formato dell'email
  - verifica l'unicità dell’email rispetto ai clienti già presenti (eccetto quello in modifica)

- Reset: ripristina i valori iniziali e cancella eventuali errori

- Parametri:

  - `customers`: lista completa dei clienti dal Redux store

  - `selectedCustomer`: cliente attualmente in modifica (se presente)

---

### Logica operativa: `useCustomersLogic()`

Hook principale che coordina tutte le operazioni della pagina clienti:

🔍 Funzionalità principali

- **Filtraggio intelligente**: Ricerca in tempo reale su nome, email e telefono
- **Gestione modali**: Stato apertura/chiusura per add, edit e delete
- **Toast notifications**: Feedback immediato per successo/errore operazioni
- **Integrazione form**: Utilizza React Hook Form per gestione dati

🗿 Stati gestiti

- `selectedCustomer`: Cliente correntemente selezionato per edit/delete
- `searchTerm`: Termine di ricerca per filtraggio
- `isAddModalOpen/isEditModalOpen/isDeleteDialogOpen`: Stato modali
- `isDeleting`: Flag di caricamento durante eliminazione
- `serverError`: Gestione errori dal server

🧩 Integrazione con `useCustomerForm()`

- Condivide istanza form per add e edit
- Reset automatico form alla chiusura modali
- Validazione integrata tramite `form.trigger()`

---

### Focus dettagliato sulle funzioni

🔎 Ricerca e filtri

- Stato locale: searchTerm

- Filtro `filteredCustomers` (calcolato con `useMemo()`): verifica se il termine è contenuto in `name`, `email` o `address`.

- Calcolo `topCustomer`: cliente con `total_spent` più alto.

➕ Modale aggiunta

- Funzione `handleAddCustomer`:

  - Resetta il form

  - Apre il modale di inserimento

✏️ Modale modifica

- Funzione `handleEditCustomer`:

  - Seleziona il cliente da modificare

  - Pre-carica i dati del form

  - Apre il modale di modifica

🗑️ Dialog eliminazione

- Funzione `handleDeleteCustomer`:

  - Seleziona il cliente da eliminare

  - Apre il dialog di conferma

💾 Salvataggio cliente

- Funzione `handleSaveCustomer`:

  - Valida il form

  - Se cliente selezionato → aggiornamento

  - Altrimenti → nuovo inserimento

  - Al termine: chiude modale, resetta form e selezione

  - Gestione errori per messaggi user-friendly

✅ Conferma eliminazione

- Funzione `handleConfirmDelete`:

  - Flag `isDeleting` per stato caricamento
  - Elimina il cliente selezionato tramite thunk Redux
  - Toast notification per feedback
  - Auto-chiusura dialog e reset selezione
