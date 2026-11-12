export interface Work {
  id: string;
  src: string;
  /** Short reel shown in the viewer, when the piece has one. */
  video?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

// Stills are frames pulled from the studio's own Instagram reels.
export const WORKS: Work[] = [
  {
    id: "jason",
    src: "/images/jason-coxa.jpg",
    video: "/video/jason.mp4",
    alt: "Tatuagem realista em preto e cinza na coxa: Jason Voorhees, a máscara de hóquei e uma tira de filme com o título Friday the 13th",
    caption: "Sexta-feira 13 · coxa · preto e cinza",
    width: 720,
    height: 1280,
  },
  {
    id: "naruto",
    src: "/images/naruto-panturrilha.jpg",
    video: "/video/naruto.mp4",
    alt: "Tatuagem realista em preto e cinza na panturrilha: rosto do Naruto com a bandana da Folha e o punho cerrado",
    caption: "Naruto · panturrilha · preto e cinza",
    width: 720,
    height: 1280,
  },
  {
    id: "leao",
    src: "/images/leao-braco.jpg",
    video: "/video/leao.mp4",
    alt: "Meia manga realista no braço: leão de olhos âmbar sobre um guerreiro ajoelhado diante da cruz",
    caption: "Leão · meia manga · por @nober_tattoo",
    width: 360,
    height: 640,
  },
  {
    id: "cobertura",
    src: "/images/cobertura-depois.jpg",
    video: "/video/cobertura.mp4",
    alt: "Cobertura no antebraço: caveira com rosa em traço preto, cobrindo iniciais antigas",
    caption: "Cobertura · antebraço · caveira e rosa",
    width: 720,
    height: 1280,
  },
  {
    id: "cobertura-antes",
    src: "/images/cobertura-antes.jpg",
    alt: "Antebraço antes da cobertura, com iniciais antigas tatuadas em letra cursiva",
    caption: "Antes da cobertura",
    width: 720,
    height: 1280,
  },
  {
    id: "estencil",
    src: "/images/cobertura-estencil.jpg",
    alt: "Desenho da caveira com rosa impresso no papel de estêncil, antes de ir para a pele",
    caption: "O desenho no papel, antes da pele",
    width: 720,
    height: 1280,
  },
];
