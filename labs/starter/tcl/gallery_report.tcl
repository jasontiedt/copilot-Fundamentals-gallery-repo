#!/usr/bin/env tclsh
#
# gallery_report.tcl — legacy reporting tool for the photo gallery.
#
# Reads a pipe-delimited data file of photos and prints simple reports.
# This is the "before" artifact for Lab 9 (migrate Tcl -> Python).
#
# Usage:
#   tclsh gallery_report.tcl <data-file> filter <tag>
#   tclsh gallery_report.tcl <data-file> search <term>
#   tclsh gallery_report.tcl <data-file> top <field> <n>     ;# field: likes|downloads|views|score
#   tclsh gallery_report.tcl <data-file> report

# Load pipe-delimited records into a list of dicts.
proc load_photos {path} {
    set photos {}
    set fh [open $path r]
    while {[gets $fh line] >= 0} {
        set line [string trim $line]
        if {$line eq "" || [string index $line 0] eq "#"} {
            continue
        }
        lassign [split $line "|"] id title tags likes downloads views photographer date
        set rec [dict create \
            id $id \
            title $title \
            tags [split $tags ","] \
            likes [expr {int($likes)}] \
            downloads [expr {int($downloads)}] \
            views [expr {int($views)}] \
            photographer $photographer \
            date $date]
        lappend photos $rec
    }
    close $fh
    return $photos
}

# Lowercase and collapse non-alphanumerics to single dashes (search key).
proc normalize {s} {
    set s [string tolower $s]
    regsub -all {[^a-z0-9]+} $s "-" s
    return [string trim $s "-"]
}

proc filter_by_tag {photos tag} {
    set out {}
    set needle [string tolower $tag]
    foreach rec $photos {
        foreach t [dict get $rec tags] {
            if {[string tolower $t] eq $needle} {
                lappend out $rec
                break
            }
        }
    }
    return $out
}

proc search {photos term} {
    set out {}
    set needle [normalize $term]
    foreach rec $photos {
        set hay [normalize "[dict get $rec title] [dict get $rec photographer] [join [dict get $rec tags] { }]"]
        if {[string first $needle $hay] >= 0} {
            lappend out $rec
        }
    }
    return $out
}

# scoring
proc score {rec} {
    set l [dict get $rec likes]
    set d [dict get $rec downloads]
    set v [dict get $rec views]
    return [expr {($l * 3 + $d * 2 + $v) / 100}]
}

proc value_of {rec field} {
    if {$field eq "score"} {
        return [score $rec]
    }
    return [dict get $rec $field]
}

proc cmp_by {field a b} {
    set av [value_of $a $field]
    set bv [value_of $b $field]
    if {$av < $bv} { return 1 }
    if {$av > $bv} { return -1 }
    return 0
}

# Highest-first; ties keep input order (lsort is stable).
proc top_by {photos field n} {
    set sorted [lsort -command [list cmp_by $field] $photos]
    if {$n > [llength $sorted]} {
        set n [llength $sorted]
    }
    return [lrange $sorted 0 [expr {$n - 1}]]
}

proc format_report {photos} {
    set lines {}
    lappend lines "Gallery Report - [llength $photos] photos"
    lappend lines [string repeat "=" 40]
    foreach rec [top_by $photos score 5] {
        lappend lines [format "%-22s %5d pts  (%d views)" \
            [dict get $rec title] [score $rec] [dict get $rec views]]
    }
    return [join $lines "\n"]
}

proc main {argv} {
    if {[llength $argv] < 2} {
        puts stderr "usage: gallery_report.tcl <data-file> <command> ..."
        exit 2
    }
    set path [lindex $argv 0]
    set cmd  [lindex $argv 1]
    set photos [load_photos $path]

    switch -- $cmd {
        filter {
            foreach rec [filter_by_tag $photos [lindex $argv 2]] {
                puts [dict get $rec title]
            }
        }
        search {
            foreach rec [search $photos [lindex $argv 2]] {
                puts [dict get $rec title]
            }
        }
        top {
            set field [lindex $argv 2]
            set n [lindex $argv 3]
            foreach rec [top_by $photos $field $n] {
                puts [format "%s\t%s" [dict get $rec title] [value_of $rec $field]]
            }
        }
        report {
            puts [format_report $photos]
        }
        default {
            puts stderr "unknown command: $cmd"
            exit 2
        }
    }
}

main $argv
