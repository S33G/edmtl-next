# Conditions EDMTL — notes de révision pour le client

Statut : ébauche pour révision par le client. Des copies autonomes sont disponibles en [français](terms-draft.fr.md) et en [anglais](terms-draft.en.md). Ces notes sont internes et ne constituent pas des conditions destinées aux clients.

L’ébauche reprend les faits déjà publiés par EDMTL : devis gratuits et sans obligation de réserver, secteurs desservis et déplacements supplémentaires sur devis, principales cartes de crédit et virement Interac, ainsi que les coordonnées existantes. Elle n’établit aucuns frais, dépôt ou délai de garantie.

## Protection des aperçus et de la production

- Les versions locales et les aperçus de déploiement affichent les sept sections de l’ébauche pour révision. Les notes internes ne sont pas affichées sur la page destinée aux clients; son introduction utilise « Travailler ensemble » / « Working together ».
- Lorsque `CONTEXT=production` et que `EDMTL_TERMS_APPROVED` n’est pas exactement égal à `true`, `/terms` et `/fr/terms` affichent une simple invitation à communiquer avec EDMTL au lieu des conditions non approuvées.
- Définir `EDMTL_TERMS_APPROVED=true` uniquement après l’approbation des deux versions linguistiques et des décisions commerciales restantes par le client. Cette protection est évaluée à la compilation; tout changement du paramètre nécessite une nouvelle compilation de production.
- Les deux URL restent `noindex` et exclues du plan du site, même après le changement du paramètre d’approbation. L’indexation exige une mise à jour distincte et délibérée des métadonnées, des en-têtes Netlify et du plan du site après l’approbation.

## Décisions requises avant l’approbation

- Confirmer la dénomination légale, l’adresse de l’entreprise et la personne responsable des conditions de service.
- Définir l’acceptation du devis, le moment où la réservation est confirmée et la durée de validité du devis.
- Confirmer si les prix comprennent les taxes applicables, les déplacements, les matériaux et l’évacuation des déchets; préciser l’approbation des travaux supplémentaires.
- Déterminer si un dépôt est exigé, la date d’exigibilité du solde, la remise des reçus et les modalités de remboursement.
- Confirmer les procédures d’annulation, de report, d’absence et de report météorologique. Tout délai de préavis ou frais doit être expressément approuvé.
- Définir les exigences d’accès à la propriété, l’eau et l’électricité, la préparation des lieux, le stationnement et les zones dangereuses ou inaccessibles.
- Confirmer la façon de documenter et de traiter les dommages préexistants, les surfaces délicates et les dommages signalés après le service.
- Définir la portée de la garantie de satisfaction annoncée, les correctifs offerts, la procédure et tout délai pour signaler un problème.
- Confirmer la formulation relative à l’assurance et les exclusions avec l’assureur de l’entreprise.
- Confirmer le traitement des plaintes et des différends; faire réviser les versions finales française et anglaise selon les exigences applicables à l’entreprise.

## Vérifications avant publication

- Approuver les mêmes décisions commerciales dans les deux langues; confirmer, s’il y a lieu, quelle version prévaut.
- Mettre à jour les documents autonomes et les pages avec les versions approuvées avant d’activer le paramètre d’approbation en production. Retirer les mentions « ébauche » des documents autonomes uniquement après l’approbation.
- Vérifier que l’invitation à communiquer s’affiche en production sans approbation et que le texte approuvé s’affiche avec `EDMTL_TERMS_APPROVED=true`. Traiter l’indexation comme une étape d’approbation distincte selon les protections ci-dessus.
- Conserver une formulation de consentement adaptée à une demande gratuite : l’envoi du formulaire ne doit pas laisser entendre que des conditions commerciales non approuvées sont acceptées.
- Vérifier les durées de conservation analytique et les renseignements sur les témoins de la politique existante dans la configuration Google active. La refonte conserve ces indications sans confirmer indépendamment les paramètres du compte.
