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
    name: "O??ndligt IKEA",
    description:
      "SFB-3008 ??r en stor detaljhandelsenhet som tidigare ??gts av och m??rkts som IKEA, en popul??r m??belkedja. En person som g??r in i SFB-3008 genom huvudentr??n och sedan passerar utom synh??ll f??r d??rrarna kommer att bli f??rflyttad till SFB-3008-1. Denna f??rskjutning kommer vanligtvis att g?? obem??rkt f??rbi eftersom ingen f??r??ndring kommer att ske ur offrets perspektiv; de kommer i allm??nhet inte att bli medvetna f??rr??n de f??rs??ker ??terv??nda till ing??ngen.\n\nIng??ngen till SFB-3008 ska ??vervakas hela tiden, och ingen f??r g?? in i SFB-3008 utanf??r testning, som till??ts av beh??riga experter.\n\nM??nniskor som l??mnar SFB-3008 ska kvarh??llas och sedan debriefas innan amnestik ges. Beroende p?? varaktigheten av deras vistelse i SFB-3008, kan en omslagsartikel beh??va skapas innan de sl??pps. Alla andra enheter som l??mnar SFB-3008 ska termineras.",
  },
  {
    scpNumber: "1005",
    name: "Den m??lade mannen",
    description:
      'SFB-1005 ??r en sapient humanoid enhet som best??r av halvfast bl?? f??rg, med exakta nyanser som str??cker sig fr??n n??stan vit till djup marin. Ytan p?? SFB-1005 har en genomsnittlig dragh??llfasthet p?? cirka 75 % av den hos m??nsklig hud; detta inkluderar dess "kl??der". SFB-1005 ??r of??rm??gen att medvetet kontrollera viskositeten eller formen p?? sin ??vergripande form ut??ver den normala r??relsen hos en humanoid kropp; den kan dock kontrollera sitt yttre skikt till en punkt d??r den kan v??lja om dess f??rg kommer att smetas ut p?? kontaktytor eller inte. Graden till vilken SFB-1005 kan kontrollera sig sj??lv p?? ett s??dant s??tt blir mindre om den ??verhydratiseras.\n\nSFB-1005 ??r i form av en skallig, m??nsklig hane, ca. 1,9 m l??ng och har visat f??rm??gan att tala med en djup och resonant r??st; trots detta har SFB-1005 inget k??n i fysisk struktur eller personlig identitet. De skenbara "kl??derna" ??r integrerade som i skinn, f??rutom skjortan vid ??rmarna och nederkanten, och byxorna under anklarna. Endast SFB-1005:s skor ??r helt unika; man tror att de skapades separat fr??n resten av SFB-1005 fr??n b??rjan.',
  },
  {
    scpNumber: "2037",
    name: "Dammkaniner",
    description:
      "SFB-2037 ??r en ok??nd anomal art av Sylvilagus-sl??ktet. Exemplar har ett utseende som liknar arten Sylvilagus audubonii (Desert Cottontail rabbit). SFB-2037 delar ocks?? en gemensam diet med andra arter i sl??ktet Sylvilagus. F??r n??rvarande har stiftelsen 23 levande SFB-2037-exemplar i inneslutning.\n\nProver i dammtillst??nd best??r huvudsakligen av kaninp??ls, flingor av d??d hud, ludd och spindeln??t. Ingen levande v??vnad kan hittas i dammpartiklarna. I normalt tillst??nd uppt??cks inga oorganiska ??mnen som finns i dammtillst??ndet.",
  },
  {
    scpNumber: "066",
    name: "Eriks leksak",
    description:
      "SFB-066 ??r en amorfisk massa av fl??tat garn och band som v??ger ungef??r ett kilogram. Str??ngar av SFB-066 kan tas individuellt och manipuleras; n??r detta ??r gjort produceras en ton p?? den diatoniska skalan (C-D-E-F-G-A-B) av objektet.\n\nN??r en upps??ttning av sex eller fler toner produceras kommer SFB-066 att producera en godartad effekt av varierande karakt??r och varaktighet.",
  },
  {
    scpNumber: "1000",
    name: "Storfot",
    description:
      "SFB-1000 ??r en nattaktiv, all??tande apa, klassificerad i Hominini-grenen tillsammans med sl??ktena Pan och Homo. Vuxna vuxna varierar i storlek fr??n 1,5 till 3 m (5 till 10 fot) i h??jd och v??ger mellan 90 och 270 kg (200 - 600 lbs). De har gr??, brun, svart, r??d och ibland vit p??ls. De har stora ??gon med god syn, en uttalad ??gonbrynsrygg och en sagittal kr??n p?? pannan som liknar gorillans, men finns hos b??da k??nen. Deras intelligens ??r i niv?? med Pan troglodytes (den vanliga schimpansen).",
  },
];
