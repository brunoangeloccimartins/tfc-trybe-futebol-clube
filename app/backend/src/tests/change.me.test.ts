import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import teamsMock from './mocks/teams.mock';
import SequelizeTeam from '../database/models/teams.sequelize.model';

chai.use(chaiHttp);

const { expect } = chai;

/**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

describe('Testes rota teams', () => {
  beforeEach(function() {sinon.restore();});

  it('Teste rota teams findAll', async () => {
   sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMock as any)
   const {status, body} = await chai.request(app).get('/teams').send();
   

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teamsMock);
  });
  it('Teste rota teams findOnde', async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(teamsMock[0] as any)

    const {status, body} = await chai.request(app).get('/teams/1').send();

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teamsMock[0]);
  });
  it('Teste rota teams findOnde', async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null as any)

    const {status, body} = await chai.request(app).get('/teams/1').send();

    expect(status).to.be.equal(404);
    expect(body).to.be.eql({message: 'Team not found'});
  });
});
