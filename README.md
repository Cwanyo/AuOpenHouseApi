# Au Open House API


# List of Available API

For more information, check the [documentation](https://documenter.getpostman.com/view/3045264/collection/7E8hveG)

## Student API

URL : https://auopenhouse.herokuapp.com/api/student/

| Title | Method | URL | URL Params | Data Params |
|-------|:------:|:----|:----------:|:-----------:|
| Login | PUT | /login | - | idToken=[string] |
| Logout | GET | /logout | - | - |
| **ALL BELOW ROUTES REQUIRES USER AUTHENTICATION** |
| Get list of all faculties | GET | /faculties | - | - |
| Get faculty details | GET | /faculties/:faculty_id | faculty_id=[int] | - |
| Get list of all majors in the faculty | GET | /faculties/:faculty_id/majors | faculty_id=[int] | - |
| Get major details in the faculty | GET | /faculties/:faculty_id/majors/:major_id | faculty_id=[int]<br>major_id=[int] | - |
| Get list of upcoming events<br>(Between time start 1 hour and time end) | GET | /upevents | - | - |
| Get list of my events<br>(Student attended events) | GET | /myevents | - | - |
| Join the event | POST | /myevents/:time_id/join | time_id=[int] | - |
| Get list of all events | GET | /events | - | - |
| Get event details | GET | /events/:event_id | event_id=[int] | - |
| Get list of upcoming games<br>(Between time start and time end) | GET | /upgames | - | - |
| Get list of my games<br>(Student played games) | GET | /mygames | - | - |
| Play the game | POST | /mygames/:game_id/play | game_id=[int] | points=[int] |
| Get list of all games | GET | /games | - | - |
| Get game details | GET | /games/:game_id | game_id=[int] | - |
| Get game questions and answer | GET | /games/:game_id/questions | game_id=[int] | - |

## Authority API

URL : https://auopenhouse.herokuapp.com/api/authority/

| Title | Method | URL | URL Params | Data Params |
|-------|:------:|:----|:----------:|:-----------:|
| Login | PUT | /login | - | idToken=[string] |
| Logout | GET | /logout | - | - |
| Get list of all faculties | GET | /faculties | - | - |
| Get list of all majors in the faculty | GET | /faculties/:faculty_id/majors | faculty_id=[int] | - |
| **ALL BELOW ROUTES REQUIRES USER AUTHENTICATION** |
| Get list of all events | GET | /events | - | - |
| Add new event | POST | /events | - | event=[json] |
| Edit event | PATCH | /events | - | event=[json] |
| Delete event | DELETE | /events/:event_id | event_id=[int] | - |
| Get event times | GET | /events/:event_id/times | - | - |
| Delete event times | DELETE | /events/:event_id/times/:time_id | time_id=[int] | - |
