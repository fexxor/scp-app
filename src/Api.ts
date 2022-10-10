import { ScpEntry } from "./types/ScpEntry";

// This could be replaced by Either in the future https://gcanti.github.io/fp-ts/modules/Either.ts.html
// If we want to go further, all promises could also be TaskEither instead.
export type ApiResponse<T> =
  | { tag: "Success"; payload: T }
  | { tag: "Failure"; error: ApiError };

// TODO: Add more types of error, with more detail.
export type ApiError = "NoEntriesFound" | "OtherError";

const crudCrudUrl = "https://crudcrud.com/";

// Lazy way of storing the api key.
let apiKey = "";

// Super ugly way of getting a new api key, scraping the crudcrud website.
// Since crudCrud not only let the free keys live for only 24 hour, but also
// only let me make 100 calls, it's smoother to just limit the key to the local session.
export const loadApiKey = (): Promise<ApiResponse<void>> => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "html/text" },
  };

  return fetch(crudCrudUrl, requestOptions)
    .then((res) => {
      if (res.body) {
        return res.text().then((responseAsText) => {
          const parser = new DOMParser();
          const htmlDocument = parser.parseFromString(
            responseAsText,
            "text/html"
          );
          const endpointUrlElement = htmlDocument.querySelector(
            ".endpoint-url"
          );
          apiKey = endpointUrlElement
            ? endpointUrlElement.innerHTML.trim().split("/api/")[1]
            : "";
          return { tag: "Success", payload: undefined } as ApiResponse<void>;
        });
      } else {
        return { tag: "Failure", error: "OtherError" } as ApiResponse<void>;
      }
    })
    .catch(() => ({ tag: "Failure", error: "OtherError" }));
};

export const postScpEntry = (
  newScpEntry: ScpEntry
): Promise<ApiResponse<ScpEntry>> => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newScpEntry),
  };

  return (
    fetch(`${crudCrudUrl}api/${apiKey}/scp`, requestOptions)
      // TODO: The response should be decoded.
      .then((response) => {
        if (response.status >= 400) {
          return { tag: "Failure", error: "OtherError" } as ApiResponse<
            ScpEntry
          >;
        } else {
          return response
            .json()
            .then(
              (entry) =>
                ({ tag: "Success", payload: entry } as ApiResponse<ScpEntry>)
            );
        }
      })
      .catch(() => ({ tag: "Failure", error: "OtherError" }))
  );
};

export const updateScpEntry = ({
  _id,
  scpNumber,
  name,
  description,
}: ScpEntry): Promise<ApiResponse<void>> => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scpNumber, name, description }),
  };

  return fetch(`${crudCrudUrl}api/${apiKey}/scp/${_id}`, requestOptions)
    .then((response) => {
      if (response.status >= 400) {
        return { tag: "Failure", error: "OtherError" } as ApiResponse<void>;
      } else {
        return { tag: "Success", payload: undefined } as ApiResponse<void>;
      }
    })
    .catch(() => ({ tag: "Failure", error: "OtherError" }));
};

export const deleteScpEntry = (
  scpEntryId: string
): Promise<ApiResponse<void>> => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(`${crudCrudUrl}api/${apiKey}/scp${scpEntryId}`, requestOptions)
    .then(() => ({ tag: "Success", payload: undefined } as ApiResponse<void>))
    .catch(() => ({ tag: "Failure", error: "OtherError" }));
};

export const getScpEntries = (): Promise<ApiResponse<ScpEntry[]>> => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(`${crudCrudUrl}api/${apiKey}/scp`, requestOptions)
    .then((response) =>
      response.json().then(
        // TODO: The response should be decoded.
        (entries: ScpEntry[]) =>
          ({
            tag: "Success",
            payload: entries.reverse(),
          } as ApiResponse<ScpEntry[]>)
      )
    )
    .catch((e: unknown) => {
      // Trying to catch the error we get when the resource has not yet been defined in the backend.
      if (e == "TypeError: NetworkError when attempting to fetch resource.") {
        return { tag: "Failure", error: "NoEntriesFound" };
        // Answering with testdata
      } else {
        return { tag: "Failure", error: "OtherError" };
      }
    });
};

// Test data for convenience, should be removed in the future.
export const postTestData = (): Promise<ApiResponse<void>> => {
  return Promise.all(testData.map(postScpEntry))
    .then(
      () =>
        ({
          tag: "Success",
          payload: undefined,
        } as ApiResponse<void>)
    )
    .catch(() => ({ tag: "Failure", error: "OtherError" }));
};

const testData: ScpEntry[] = [
  {
    scpNumber: "3008",
    name: "Oändligt IKEA",
    description:
      "SFB-3008 är en stor detaljhandelsenhet som tidigare ägts av och märkts som IKEA, en populär möbelkedja. En person som går in i SFB-3008 genom huvudentrén och sedan passerar utom synhåll för dörrarna kommer att bli förflyttad till SFB-3008-1. Denna förskjutning kommer vanligtvis att gå obemärkt förbi eftersom ingen förändring kommer att ske ur offrets perspektiv; de kommer i allmänhet inte att bli medvetna förrän de försöker återvända till ingången.\n\nIngången till SFB-3008 ska övervakas hela tiden, och ingen får gå in i SFB-3008 utanför testning, som tillåts av behöriga experter.\n\nMänniskor som lämnar SFB-3008 ska kvarhållas och sedan debriefas innan amnestik ges. Beroende på varaktigheten av deras vistelse i SFB-3008, kan en omslagsartikel behöva skapas innan de släpps. Alla andra enheter som lämnar SFB-3008 ska termineras.",
  },
  {
    scpNumber: "1005",
    name: "Den målade mannen",
    description:
      'SFB-1005 är en sapient humanoid enhet som består av halvfast blå färg, med exakta nyanser som sträcker sig från nästan vit till djup marin. Ytan på SFB-1005 har en genomsnittlig draghållfasthet på cirka 75 % av den hos mänsklig hud; detta inkluderar dess "kläder". SFB-1005 är oförmögen att medvetet kontrollera viskositeten eller formen på sin övergripande form utöver den normala rörelsen hos en humanoid kropp; den kan dock kontrollera sitt yttre skikt till en punkt där den kan välja om dess färg kommer att smetas ut på kontaktytor eller inte. Graden till vilken SFB-1005 kan kontrollera sig själv på ett sådant sätt blir mindre om den överhydratiseras.\n\nSFB-1005 är i form av en skallig, mänsklig hane, ca. 1,9 m lång och har visat förmågan att tala med en djup och resonant röst; trots detta har SFB-1005 inget kön i fysisk struktur eller personlig identitet. De skenbara "kläderna" är integrerade som i skinn, förutom skjortan vid ärmarna och nederkanten, och byxorna under anklarna. Endast SFB-1005:s skor är helt unika; man tror att de skapades separat från resten av SFB-1005 från början.',
  },
  {
    scpNumber: "2037",
    name: "Dammkaniner",
    description:
      "SFB-2037 är en okänd anomal art av Sylvilagus-släktet. Exemplar har ett utseende som liknar arten Sylvilagus audubonii (Desert Cottontail rabbit). SFB-2037 delar också en gemensam diet med andra arter i släktet Sylvilagus. För närvarande har stiftelsen 23 levande SFB-2037-exemplar i inneslutning.\n\nProver i dammtillstånd består huvudsakligen av kaninpäls, flingor av död hud, ludd och spindelnät. Ingen levande vävnad kan hittas i dammpartiklarna. I normalt tillstånd upptäcks inga oorganiska ämnen som finns i dammtillståndet.",
  },
  {
    scpNumber: "066",
    name: "Eriks leksak",
    description:
      "SFB-066 är en amorf massa av flätat garn och band som väger ungefär ett kilogram. Strängar av SFB-066 kan tas individuellt och manipuleras; när detta är gjort produceras en ton på den diatoniska skalan (C-D-E-F-G-A-B) av objektet.\n\nNär en uppsättning av sex eller fler toner produceras kommer SFB-066 att producera en godartad effekt av varierande karaktär och varaktighet.",
  },
  {
    scpNumber: "1000",
    name: "Storfot",
    description:
      "SFB-1000 är en nattaktiv, allätande apa, klassificerad i Hominini-grenen tillsammans med släktena Pan och Homo. Vuxna vuxna varierar i storlek från 1,5 till 3 m (5 till 10 fot) i höjd och väger mellan 90 och 270 kg (200 - 600 lbs). De har grå, brun, svart, röd och ibland vit päls. De har stora ögon med god syn, en uttalad ögonbrynsrygg och en sagittal krön på pannan som liknar gorillans, men finns hos båda könen. Deras intelligens är i nivå med Pan troglodytes (den vanliga schimpansen).",
  },
];
