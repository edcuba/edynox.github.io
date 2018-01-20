---
layout: post
categories: [GSOC, SWDB]
title: "Google Summer Of Code 2017"
description: "Due to my previous work on project SWDB - unified Software database for DNF, 
I'm proposing project for GSoC about SWDB integration into PackageKit. With SWDB integrated both in DNF and PackageKit, it should be possible to install packages via PackageKit and list, undo, redo or rollback these transactions with DNF."
---

<img src="/res/gsoc2016-sun-373x373.png" width="30%" align="right">

## {{page.title}}

Due to my previous work on project SWDB - unified Software database for DNF, 
I'm proposing project for GSoC about SWDB integration into PackageKit. With SWDB integrated both in DNF and PackageKit, it should be possible to install packages via PackageKit and list, undo, redo or rollback these transactions with DNF.

We are facing new requirements for software every day and sometimes it is really hard to keep things organized.
Package manager YUM is great example of this issue. 
While significant part if YUM is already rewritten, YUM databases remained. 
Outdated design, data duplicity and no shared API is dangerous combination for cooperation of multiple package managers.

SWDB is providing new design suitable for current needs of DNF.
Problem is, that DNF is not only package manager in the system.
Gnome Software Package Manager is probably more convenient way how to install package for regular user.
It is using PackageKit and PackageKit is logging into outdated yumdb, so DNF will not remove user installed packages.
Unifying DNF software databases is opportunity to make connection between PackageKit and DNF stronger and safer.

PackageKit is accessing yumdb in very hacky way.
Therefore there is no connection between DNF and PackageKit transactions and unintended user installed package removal hazard ([F24 blocker](https://bugzilla.redhat.com/show_bug.cgi?id=1259865)).

Swdb is part of libdnf as dnf-swdb library. It is providing all required functionality to operate with swdb.
PackageKit integration is missing.

When dnf-swdb will be merged with DNF upstream, there will be need to provide support for PackageKit to avoid package conflicts and unintended removals. PackageKit is using libdnf modules to operate yum and history database.

I would like to:

 - rewrite libdnf modules to cooperate with dnf-swdb
 - provide transaction history support for PackageKit shared with DNF
