export interface User {
    login: string;
    id: number;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Creator {
    login: string;
    id: number;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Milestone {
    url: string;
    html_url: string;
    labels_url: string;
    id: number;
    number: number;
    title: string;
    description: string;
    creator: Creator;
    open_issues: number;
    closed_issues: number;
    state: string;
    created_at: Date;
    updated_at: Date;
    due_on?: any;
    closed_at?: any;
}

export interface PullRequest {
    diff_url: string;
    html_url: string;
    patch_url: string;
    url: string;
}

export interface Issue {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    number: number;
    title: string;
    user: User;
    labels: any[];
    state: string;
    locked: boolean;
    assignee?: any;
    assignees: any[];
    milestone: Milestone;
    comments: number;
    created_at: any;
    updated_at: any;
    closed_at?: any;
    author_association: string;
    body: string;
    pull_request: PullRequest;
    mark_down?: string;
}
