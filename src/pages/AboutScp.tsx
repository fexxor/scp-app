import { Card, Grid, Link, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
// item xs={8} md={8} lg={8}
class AboutScp extends React.Component {
  render = () => {
    return (
      <Container
        sx={{
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xs={12} md={8} lg={8}>
            <Card variant="outlined" sx={{ padding: "2rem" }}>
              <Typography variant="h5" marginBottom="1rem">
                Om SFB
              </Typography>
              <Typography
                variant="subtitle1"
                marginBottom="1rem"
                fontWeight="600"
              >
                Uppdragsbeskrivning
              </Typography>
              <Typography variant="body1" marginBottom="1rem">
                Stiftelsen verkar i hemlighet och över hela världen och verkar
                utanför jurisdiktion, bemyndigad och anförtrodd av varje större
                nationell regering med uppgiften att innehålla avvikande
                föremål, enheter och fenomen. Många av dessa anomalier utgör ett
                betydande hot mot den globala säkerheten genom att hota antingen
                fysisk eller psykisk skada. Alla undergräver de naturlagar som
                världens människor implicit litar på.
              </Typography>
              <Typography variant="body1" marginBottom="1rem">
                Stiftelsen upprätthåller en omfattande databas med information
                om anomalier som kräver särskilda inneslutningsprocedurer,
                vanligen kallade "SFBs". Den primära databasen innehåller
                sammanfattningar av sådana anomalier och nödprocedurer för att
                upprätthålla eller återupprätta säker inneslutning i händelse av
                ett inneslutningsbrott eller annan händelse.
              </Typography>
              <Typography variant="body1" marginBottom="1rem">
                Stiftelsen verkar för att upprätthålla normalitet, så att den
                globala civilbefolkningen kan leva och fortsätta med sina
                dagliga liv utan rädsla, misstro eller tvivel i sin personliga
                övertygelse, och för att upprätthålla mänskligt oberoende från
                utomjordiskt, utomdimensionellt och annat utomnormalt
                inflytande.
              </Typography>
              <Typography variant="body1" marginBottom="1rem">
                Vårt uppdrag är tredelat:
              </Typography>
              <Typography
                variant="subtitle1"
                marginBottom="1rem"
                fontWeight="600"
              >
                Säkra
              </Typography>
              <Typography variant="body1" marginBottom="1rem">
                Stiftelsen säkrar anomalier med målet att förhindra att de
                hamnar i händerna på civila eller rivaliserande myndigheter,
                genom omfattande observation och övervakning och genom att agera
                för att avlyssna sådana anomalier så snart som möjligt.
              </Typography>
              <Typography
                variant="subtitle1"
                marginBottom="1rem"
                fontWeight="600"
              >
                Förvara
              </Typography>
              <Typography variant="body1" marginBottom="1rem">
                Stiftelsen innehåller anomalier med målet att förhindra deras
                inflytande eller effekter från att spridas, genom att antingen
                flytta, dölja eller avveckla sådana anomalier eller genom att
                undertrycka eller förhindra offentlig spridning av kunskap om
                dessa.
              </Typography>
              <Typography
                variant="subtitle1"
                marginBottom="1rem"
                fontWeight="600"
              >
                Beskydda
              </Typography>
              <Typography variant="body1" marginBottom="1rem">
                Stiftelsen skyddar mänskligheten från effekterna av sådana
                anomalier såväl som själva anomalierna tills de antingen är helt
                förstådda eller nya vetenskapsteorier kan utarbetas baserat på
                deras egenskaper och beteende. Stiftelsen kan också neutralisera
                eller förstöra anomalier som en sista utväg, om de bedöms vara
                för farliga för att begränsas.
              </Typography>
              <Typography variant="body1" marginBottom="1rem">
                Ytterligare information kommer att ha tillhandahållits när du
                ansluter dig till oss i jakten på våra primära uppdrag.
                Välkommen till stiftelsen, och lycka till.
              </Typography>

              <Typography variant="body1" marginBottom="1rem">
                I den här webapplikationen kan du registrera objekt som fångats
                in eller observerats.
              </Typography>
              <Link
                href="https://scp-wiki.wikidot.com/about-the-scp-foundation"
                target="_blank"
                rel="noreferrer"
                marginBottom="1rem"
              >
                Se vår internationella paraplyorganisation, SCP
              </Link>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  };
}

export default AboutScp;
