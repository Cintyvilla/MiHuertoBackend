import { Router } from 'express';
import * as CourseController from '#src/controllers/courses/Course.controller.js';
import * as UserOnCourseController from '#src/controllers/courses/UsersOnCourse.controller.js';
import * as TopicCourseController from '#src/controllers/courses/TopicsCourse.controller.js';

var router = Router();

router.get('/users', UserOnCourseController.Get);
router.post('/users', UserOnCourseController.Insert);
router.post('/users/add-progress/:id', UserOnCourseController.AddProgressCourse);
router.get('/users/:id', UserOnCourseController.GetById);
router.delete('/users/:id', UserOnCourseController.Delete);

router.get('/topics', TopicCourseController.Get);
router.post('/topics', TopicCourseController.Insert);
router.get('/topics/:id', TopicCourseController.GetById);
router.put('/topics/:id', TopicCourseController.Update);
router.delete('/topics/:id', TopicCourseController.Delete);

router.get('/', CourseController.Get);
router.post('/', CourseController.Insert);
router.get('/:id', CourseController.GetById);
router.put('/:id', CourseController.Update);
router.delete('/:id', CourseController.Delete);


export default router;
