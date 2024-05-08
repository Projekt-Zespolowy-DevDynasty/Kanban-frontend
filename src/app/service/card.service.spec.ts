import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CardsService } from './cards.service';
import { Card } from '../models/card.model';
import { environment } from '../../environments/environment';

describe('CardsService', () => {
  let service: CardsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardsService]
    });

    service = TestBed.inject(CardsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure that there are no outstanding requests.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('postCard test ', () => {

    const mockCard: Card = 
        {id: 1, name: 'Card 1', maxTasksLimit: 5, position: 1, tasks: []};
    
    service.postCard(mockCard).subscribe(card => {
      expect(card).toEqual(mockCard);
    });

    const req = httpTestingController.expectOne(`${environment.backendUrl}/card/add`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockCard);
  });

  it('getCards test ', () => {
    const mockCards: Card[] = [
      {id: 1, name: 'Card 1', maxTasksLimit: 5, position: 1, tasks: []},
      {id: 2, name: 'Card 2', maxTasksLimit: 5, position: 2, tasks: []},
    ];

    service.getCards().subscribe(cards => {
      expect(cards).toEqual(mockCards);
    });

    const req = httpTestingController.expectOne(`${environment.backendUrl}/card/all`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockCards);
  });

  it('getOneCard test ', () => {
    const mockCard: Card = 
        {id: 1, name: 'Card 1', maxTasksLimit: 5, position: 1, tasks: []};
    
    service.getOneCard(1).subscribe(card => {
      expect(card).toEqual(mockCard);
    });

    const req = httpTestingController.expectOne(`${environment.backendUrl}/card/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockCard);
  });
  it('deleteCard test ', () => {
        service.deleteCard(1).subscribe();
    
        const req = httpTestingController.expectOne(`${environment.backendUrl}/card/1`);
        expect(req.request.method).toEqual('DELETE');
    });

    it('changeLimit test ', () => {
        service.changeLimit(1, 5).subscribe();
    
        const req = httpTestingController.expectOne(`${environment.backendUrl}/card/1/maxTasksLimit`);
        expect(req.request.method).toEqual('PUT');
    });

    it('moveTasks test ', () => {
        service.moveTasks(1, 1, 2, 1).subscribe();
    
        const req = httpTestingController.expectOne(`${environment.backendUrl}/card/1/move-task/1/to-card/2/at-index/1`);
        expect(req.request.method).toEqual('PUT');
    });



});