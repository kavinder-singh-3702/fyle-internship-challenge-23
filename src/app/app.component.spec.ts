import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiServiceStub: Partial<ApiService>;

  beforeEach(async () => {
    // Stub ApiService methods
    apiServiceStub = {
      getRepos: jasmine.createSpy().and.returnValue(of([])),
      getUser: jasmine.createSpy().and.returnValue(of({ public_repos: 0 })),
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: ApiService, useValue: apiServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchRepos and fetchUser on search', () => {
    const username = 'testuser';
    component.onSearch(username);
    expect(component.user).toEqual(username);
    expect(apiServiceStub.getRepos).toHaveBeenCalledWith(
      username,
      component.pageSize,
      0
    );
    expect(apiServiceStub.getUser).toHaveBeenCalledWith(username);
  });

  it('should increment currentPage and call updatePage on nextPage if there are more pages', () => {
    component.currentPage = 1;
    component.totalRepos = 20;
    component.pageSize = 10;
    spyOn(component, 'updatePage');
    component.nextPage();
    expect(component.currentPage).toBe(2);
    expect(component.updatePage).toHaveBeenCalled();
  });

  it('should not increment currentPage or call updatePage on nextPage if there are no more pages', () => {
    component.currentPage = 2;
    component.totalRepos = 15;
    component.pageSize = 10;
    spyOn(component, 'updatePage');
    component.nextPage();
    expect(component.currentPage).toBe(2);
    expect(component.updatePage).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});
