import {ICard} from './interfaces/ICard';
import getRealm from './realm';

export const putCards = async (data: ICard) => {
  const realm = await getRealm();
  try {
    realm.write(() => {
      data.checked = !data.checked;
    });
  } catch (error) {
    console.log(error);
  }
};

export const putCardsResetDay = async (group: string) => {
  const realm = await getRealm();
  try {
    let data = realm.objects<ICard>('Card').filtered(`group=='${group}'`);
    realm.write(() => {
      data.map(dataItem => (dataItem.checked = false));
    });
  } catch (error) {
    console.log(error);
  }
};

export const putCardsResetAll = async (dateCreated: string) => {
  const realm = await getRealm();
  try {
    let data = realm
      .objects<ICard>('Card')
      .filtered(`dateCreated=='${dateCreated}'`);
    realm.write(() => {
      data.map(dataItem => (dataItem.checked = false));
    });
  } catch (error) {
    console.log(error);
  }
};

export const putCardsResetMonth = async (data: ICard) => {
  const realm = await getRealm();
  try {
    realm.write(() => {
      data.checked = !data.checked;
    });
  } catch (error) {
    console.log(error);
  }
};

export const postCards = async () => {
  const realm = await getRealm();
  try {
    realm.write(() => {
      // dia 1
      realm.create('Card', {
        _id: 1,
        bodyRegion: 'Peito',
        descriptions: ['SUPINO DECLINADO MAX '],
        imageUrl: 'https://i.ibb.co/xG56XT8/supino-declinado.png',
        checked: false,
        group: 'dia 01',
        dateCreated: '04/2023 - 05/2023',
        comments: [
          '- barra na linha do olho',
          '- trazer pra perto do peito',
          '- juntar escapulas',
          '- ao subir/descer a barra fazer o movimento de intencionar uma mão a outra(adução horizontal)',
        ],
      });
      realm.create('Card', {
        _id: 2,
        bodyRegion: 'Peito',
        descriptions: ['SUPINO INCLINADO MAX'],
        imageUrl: 'https://i.ibb.co/HqY7TbM/supino-inclinado.png',
        checked: false,
        group: 'dia 01',
        dateCreated: '04/2023 - 05/2023',
        comments: [
          '- barra na linha do olho',
          '- trazer pra perto do peito',
          '- juntar escapulas',
          '- ao subir/descer a barra fazer o movimento de intencionar uma mão a outra(adução horizontal)',
        ],
      });
      realm.create('Card', {
        _id: 3,
        bodyRegion: 'Peito',
        descriptions: ['CRUCIFIXO CROSS 4X 15', '10 MEIO SUGADO'],
        imageUrl: 'https://i.ibb.co/Ct8Swyj/crucifixo-cross.png',
        checked: false,
        group: 'dia 01',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 4,
        bodyRegion: 'Ombro',
        descriptions: [
          'DESENVOLVIMENTO OMBRO FRENTE 4X 12',
          'PRANCHA CORRENDO 30X',
        ],
        imageUrl: 'https://i.ibb.co/f4HcqNb/desenvolvimento-ombro.png',
        checked: false,
        group: 'dia 01',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 5,
        bodyRegion: 'Ombro',
        descriptions: [
          'ELEVAÇÃO FRONTAL LIVRE 15 + 12 + 10',
          'ABDUÇÃO DE OMBRO 15 + 12 + 10',
        ],
        imageUrl: 'https://i.ibb.co/2cctWMx/elevacao-frontal-livre.png',
        checked: false,
        group: 'dia 01',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 6,
        bodyRegion: 'Ombro',
        descriptions: [
          'REMADA ALTA MAX COM 2 ENCOLHIMENTO BARRA LIVRE',
          '30 SKIPER ALTO',
        ],
        imageUrl: 'https://i.ibb.co/C1T9svx/remada-alta.png',
        checked: false,
        group: 'dia 01',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 7,
        bodyRegion: 'Tríceps',
        descriptions: ['TRÍCEPS INVERSO HORIZONTAL 4X20', 'VERTICAL 4X20'],
        imageUrl: 'https://i.ibb.co/RznD13N/tricips-inverso.png',
        checked: false,
        group: 'dia 01',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 8,
        bodyRegion: 'Tríceps',
        descriptions: ['TRÍCEPS TESTA 3X MAX'],
        imageUrl: 'https://i.ibb.co/2P4ztdP/tricips-testa.png',
        checked: false,
        group: 'dia 01',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      // dia 2
      realm.create('Card', {
        _id: 9,
        bodyRegion: 'Tríceps',
        descriptions: ['TRÍCEPS FRANCÊS 3X MAX', 'PRANCHA CORRENDO 20X'],
        imageUrl: 'https://i.ibb.co/gwLBkZX/triceps-frances.png',
        checked: false,
        group: 'dia 02',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 10,
        bodyRegion: 'Bíceps',
        descriptions: ['ROSCA DIRETA 4X'],
        imageUrl: 'https://i.ibb.co/b7QhRKp/rosca-direta.png',
        checked: false,
        group: 'dia 02',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 11,
        bodyRegion: 'Bíceps',
        descriptions: ['ROSCA CORDA 3X 15', 'PIRÂMIDE 8 + 10 + 12'],
        imageUrl: 'https://i.ibb.co/Q67H60C/rosca-corda.png',
        checked: false,
        group: 'dia 02',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 12,
        bodyRegion: 'Bíceps',
        descriptions: ['ROSCA SCOTT 3X MAX', 'ABD. REMADOR 3X MAX'],
        imageUrl: 'https://i.ibb.co/DGwTJvK/rosca-scott.png',
        checked: false,
        group: 'dia 02',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 13,
        bodyRegion: 'Costa',
        descriptions: [
          'REMADA CAVALINHO 3X20',
          '30 FLEXÕES DE JOELHO CORRENDO',
        ],
        imageUrl: 'https://i.ibb.co/Sx0TJkW/remada-cavalinho.png',
        checked: false,
        group: 'dia 02',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 14,
        bodyRegion: 'Costa',
        descriptions: ['PUXADOR FRENTE 3X MAX'],
        imageUrl: 'https://i.ibb.co/gTVRC4B/puxador-frente.png',
        checked: false,
        group: 'dia 02',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 15,
        bodyRegion: 'Costa',
        descriptions: ['REMADA ARTICULADA 3X MAX'],
        imageUrl: 'https://i.ibb.co/MZvP6vJ/remada-articulada.png',
        checked: false,
        group: 'dia 02',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      // dia 3
      realm.create('Card', {
        _id: 16,
        bodyRegion: 'Quadríceps',
        descriptions: ['AGACHAMENTO HACK 3X MAX'],
        imageUrl: 'https://i.ibb.co/Fw4ffvv/agachamento-hack.png',
        checked: false,
        group: 'dia 03',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 17,
        bodyRegion: 'Quadríceps',
        descriptions: ['LEG 45 4x 15'],
        imageUrl: 'https://i.ibb.co/JkY3CYJ/lag-45.png',
        checked: false,
        group: 'dia 03',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 18,
        bodyRegion: 'Quadríceps',
        descriptions: ['AGACHAMENTO ARTICULADO 3X 15'],
        imageUrl: 'https://i.ibb.co/n8Y2YG4/agachamento-articulado.png',
        checked: false,
        group: 'dia 03',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 19,
        bodyRegion: 'Quadríceps',
        descriptions: ['LAG HORINZONTAL 3X MAX'],
        imageUrl: 'https://i.ibb.co/fvvH5Zg/lag-horizontal.png',
        checked: false,
        group: 'dia 03',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 20,
        bodyRegion: 'Quadríceps',
        descriptions: ['CADEIRA EXTENSORA 3X MAX'],
        imageUrl: 'https://i.ibb.co/9g79Fxd/cadeira-extensora.png',
        checked: false,
        group: 'dia 03',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 21,
        bodyRegion: 'Quadríceps',
        descriptions: ['ADUÇÃO MÁQUINA 3X30'],
        imageUrl: 'https://i.ibb.co/tB5n3Xc/aducao-maquina.png',
        checked: false,
        group: 'dia 03',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 22,
        bodyRegion: 'Quadríceps',
        descriptions: [
          'ABDUÇÃO MÁQUINA 3X 30',
          '15 + 12 + 10 CORRIDA CURTA FRENTE COSTA',
        ],
        imageUrl: 'https://i.ibb.co/2g0j18Q/abducao-maquina.png',
        checked: false,
        group: 'dia 03',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 23,
        bodyRegion: 'Panturrilha',
        descriptions: ['PANTURRILHA MAX', 'CORRIDA NO STEP 30X'],
        imageUrl: 'https://i.ibb.co/fpvN9GQ/panturrilha.png',
        checked: false,
        group: 'dia 03',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
      realm.create('Card', {
        _id: 24,
        bodyRegion: 'Panturrilha',
        descriptions: ['FLEXORA VERTICAL 3x 12 + 10 ALTO'],
        imageUrl: 'https://i.ibb.co/M8dYTh6/flexora-vertical.png',
        checked: false,
        group: 'dia 03',
        dateCreated: '04/2023 - 05/2023',
        comments: [''],
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeAllCards = async () => {
  const realm = await getRealm();
  try {
    realm.write(() => {
      realm.deleteAll();
    });
  } catch (error) {
    console.log(error);
  }
};

export const days = ['dia 01', 'dia 02', 'dia 03', 'todos os dias'];

export const months = ['01/2023', '02/2023', '03/2023', '04/2023'];
