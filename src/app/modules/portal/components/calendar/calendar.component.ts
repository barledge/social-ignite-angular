import {ChangeDetectionStrategy, Component} from '@angular/core';
import {addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays} from 'date-fns';
import {Subject} from 'rxjs';
// import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';

declare var require: any;
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require('./calendar.component.html'),
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent {
  // @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.blue,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: false,
        afterEnd: false
      },
      draggable: true
    },
    {
      start: new Date(),
      end: addHours(new Date(), 1),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: false,
        afterEnd: false
      },
      draggable: true
    },
    {
      start: new Date(),
      end: addHours(new Date(), 1),
      title: 'A draggable and resizable event1',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: false,
        afterEnd: false
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor() {
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    // this.modal.open(this.modalContent, {size: 'lg'});
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
}
