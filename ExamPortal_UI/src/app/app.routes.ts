import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { adminGuard } from './services/admin.guard';
import { normalGuard } from './services/normal.guard';
import { disableBackGuard } from './disable-back.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionComponent } from './pages/admin/view-quiz-question/view-quiz-question.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';

export const routes: Routes = [
    {  path:"", component:HomeComponent },
    {  path:"login", component:LoginComponent },
    {  path: "signup", component:SignupComponent},
    {  path: "admin", component:DashboardComponent,
    children:[
        {
            path:'',
            component:WelcomeComponent
        },
        {
            path:'profile',
            component:ProfileComponent
        },
        {
            path:"categories",
            component:ViewCategoriesComponent
        },
        {
            path:"add-category",
            component:AddCategoriesComponent
        },
        {
            path:"quizzes",
            component:ViewQuizzesComponent
        },
        {
            path:"add-quiz",
            component:AddQuizComponent
        },
        {
            path:"quiz/:qid",
            component:UpdateQuizComponent
        },
        {
            path:"view-questions/:id/:title",
            component:ViewQuizQuestionComponent
        },
        {
            path:"add-question/:qid/:title",
            component:AddQuestionComponent
        },
        {
            path:"update-question/:quesId",
            component:UpdateQuestionComponent
        }
    ],
    canActivate:[adminGuard]},
    // {  path: "admin", loadComponent:()=>
    //         import('./pages/admin/dashboard/dashboard.component').then((m)=>m.DashboardComponent), canActivate:[adminGuard]},
   
   
    {  path: "user-dashboard", component:UserDashboardComponent,
        children:[
            {
                path:'profile',
                component:ProfileComponent
            },
           
            {
                path:'instructions/:qid',
                component:InstructionsComponent
            },
            {path:':catId', component:LoadQuizComponent},
        ]    ,
        canActivate:[normalGuard],
    },
    {
        path:'start/:qid',
        component:StartComponent,
        canActivate:[normalGuard],
    },

];
// 